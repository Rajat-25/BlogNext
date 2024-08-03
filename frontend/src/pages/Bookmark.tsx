import { ArrowUpRightIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import React, { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import BlogItem from '../components/BlogItem';
import {
  RootState,
  useFetchBookmarkedBlogQuery,
  useRemoveBookmarkBlogMutation,
} from '../store';

const Bookmark: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.user_slice);
  const { data: bookmarkData, isLoading } = useFetchBookmarkedBlogQuery({
    token,
  });
  const [removeBookmarkBlog] = useRemoveBookmarkBlogMutation();
  let content;

  const handleBookmark = async (
    e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
    data: BlogResponseType
  ) => {
    const path = e.currentTarget as SVGSVGElement;

    if (path?.classList.contains('fill-yellow-400')) {
      path.classList.toggle('fill-yellow-400');
      await removeBookmarkBlog({ token, blogId: data._id });
    }
  };

  if (isLoading) {
    content = <div>Loading...</div>;
  } else {
    content = bookmarkData?.map((data: BlogResponseType) => {
      const style =
        'hover:scale-125 w-[1rem] h-[1rem] sm:w-[1.3rem] sm:h-[1.3rem] lg:w-[1.5rem] lg:h-[1.5rem]';

      return (
        <BlogItem
          data={data}
          key={data._id}
          child={
            <>
              <BookmarkIcon
                onClick={(e) => handleBookmark(e, data)}
                className={`fill-yellow-400 ${style}`}
              />
              <ArrowUpRightIcon className={`fill-yellow-400 ${style}`} />
            </>
          }
        />
      );
    });
  }
  return (
    <div className='p-6 flex flex-col gap-6'>
      <h2 className='text-lg sm:text-2xl text-center font-semibold'>
        Read now 
      </h2>
      {content}
    </div>
  );
};

export default Bookmark;
