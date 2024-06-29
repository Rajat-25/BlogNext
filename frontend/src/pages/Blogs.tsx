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
    return (
      <>
        <PencilIcon
          onClick={(e) => editHandler({ e, data })}
          className='hover:scale-125  size-6'
        />
        <TrashIcon
          onClick={(e) => deleteHandler({ e, data })}
          className='hover:scale-125  size-6'
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
    content=<div>Loading....</div>;
  } else if (blogData) {
    if (filterStr == '') {
      content = getContent(blogData);
    } else {
      const blogs = filteredBlogs({ blogs: blogData, filterStr });
      content = getContent(blogs);
    }
  }

  return (
    <div className='h-creen w-screen px-8 py-4 '>
      <div className='flex flex-col gap-3 '>
        <div className='flex justify-center text-xl font-semibold'>
          Read | Write | Share
        </div>
        <SearchBar onSearch={onSearch} str={filterStr} />

        <div className='p-4 grid grid-cols-6 gap-4'>
          <div className='flex flex-col gap-4 col-span-5'>{content}</div>
          <div className=' col-span-1'>
            <Button
              onClickHandler={() => navigate(urlPath.create)}
              btnVariant='success'
              text='New'
              extraClass='w-full p-2'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
