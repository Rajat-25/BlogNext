import { BookmarkIcon } from '@heroicons/react/24/outline';
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import { MouseEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BlogItem from '../components/BlogItem';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import {
  RootState,
  useAddBookmarkBlogMutation,
  useFetchAllBlogsQuery,
  useRemoveBookmarkBlogMutation
} from '../store';
import { filteredBlogs } from '../utils';

const Explore: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.user_slice);
  const [filterStr, setFilterStr] = useState<string>('');

  const { pageNumber } = useParams();
  let pgNo = Number(pageNumber);

  const {
    data: blogData,
    isSuccess: blogsSuccess,
    isLoading,
  } = useFetchAllBlogsQuery({
    token,
    pgNo,
  });

 
  const [addBookmarkBlog] = useAddBookmarkBlogMutation();
  const [removeBookmarkBlog] = useRemoveBookmarkBlogMutation();

  const onSearch = (query: string) => setFilterStr(query);

  const handleBookmark = async (
    e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
    data: BlogResponseType
  ) => {
    const path = e.currentTarget as SVGSVGElement;

    if (path?.classList.contains('fill-yellow-400')) {
      path.classList.toggle('fill-yellow-400');
      await removeBookmarkBlog({ token, blogId: data._id });
    } else {
      path?.classList.toggle('fill-yellow-400');
      await addBookmarkBlog({ token, blogId: data._id });
    }
  };

  const getContent = (blogs: BlogResponseType[], bookmark: string[]) => {
    return (
      blogs &&
      blogs.map((data: BlogResponseType) => {
        const { _id } = data as BlogResponseType;
        const isBookMarked = bookmark.includes(_id) ? 'fill-yellow-400' : '';

        return (
          <BlogItem
            key={data._id}
            data={data}
            child={
              <>
                <BookmarkIcon
                  onClick={(e) => handleBookmark(e, data)}
                  className={`hover:scale-125 size-6 ${isBookMarked} `}
                />
                <ArrowUpRightIcon className='hover:scale-125  size-6' />
              </>
            }
          />
        );
      })
    );
  };

  let content;
  if (isLoading) {
    content = (
      <div className='flex justify-center items-center'>Loading...</div>
    );
  } else if (blogsSuccess) {
    const { blogs, isPrevPage, isNextPage, bookmark } = blogData;
    const filtered = filterStr ? filteredBlogs({ blogs, filterStr }) : blogs;
    const result = filtered?.length ? getContent(filtered, bookmark) : null;

    content = (
      <>
        {result}
        <Pagination pgNo={pgNo} isPrev={isPrevPage} isNext={isNextPage} />
      </>
    );
  }

  return (
    <div className='h-screen w-screen  px-8 py-4 '>
      <div className='flex flex-col gap-6 '>
        <SearchBar onSearch={onSearch} str={filterStr} />
        {content}
      </div>
    </div>
  );
};

export default Explore;
