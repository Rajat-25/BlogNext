import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  currentBlog,
  useDeleteBlogMutation,
  useFetchUserBlogsQuery,
} from '../store';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import BlogItem from '../components/BlogItem';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import { filteredBlogs, urlPath } from '../utils';

const Blogs = () => {
  const { token } = useSelector((state: RootState) => state.user_slice);
  const [filterStr, setFilterStr] = useState<string>('');
  const { data: blogData, isLoading } = useFetchUserBlogsQuery({ token });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteBlog] = useDeleteBlogMutation();

  const onSearch = (query: string) => setFilterStr(query);

  const editHandler = ({ e, data }: IconActionType) => {
    e?.stopPropagation();
    navigate(urlPath.edit);
    dispatch(currentBlog({ blog: data }));
  };

  const deleteHandler = ({ e, data }: IconActionType) => {
    e?.stopPropagation();
    deleteBlog({ token, id: data._id });
  };

  const getActionIcons = (data: BlogResponseType) => {
    const style='hover:scale-125 w-[1rem] h-[1rem] sm:w-[1.3rem] sm:h-[1.3rem] lg:w-[1.5rem] lg:h-[1.5rem]'

    return (
      <>
        <PencilIcon
          onClick={(e) => editHandler({ e, data })}
          className={style}
        />
        <TrashIcon
          onClick={(e) => deleteHandler({ e, data })}
          className={style}
        />
      </>
    );
  };

  const getContent = (data: BlogResponseType[]) => {
    const res = data?.map((data: BlogResponseType) => {
      const child = getActionIcons(data);
      return <BlogItem key={data._id} data={data} child={child} />;
    });
    return res;
  };

  let content = null;

  if (isLoading) {
    content = <div>Loading....</div>;
  } else if (blogData) {
    if (filterStr == '') {
      content = getContent(blogData);
    } else {
      const blogs = filteredBlogs({ blogs: blogData, filterStr });
      content = getContent(blogs);
    }
  }

  return (
    <div className='px-8 py-4 '>
      <div className='flex flex-col gap-3 '>
        <div className='flex justify-center text-xl font-semibold'>
          Read | Write | Share
        </div>
        <SearchBar onSearch={onSearch} str={filterStr} />

        <div className='p-4 flex flex-col md:grid md:grid-cols-6 gap-4'>
          <div className=' md:col-span-1 md:order-1'>
            <Button
              onClickHandler={() => navigate(urlPath.create)}
              btnVariant='success'
              text='New'
              extraClass='w-full p-2 text-white '
            />
          </div>
          <div className='flex flex-col gap-4 md:col-span-5'>{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
