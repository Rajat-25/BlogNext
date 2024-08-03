import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentBlog } from '../store';
import { urlPath } from '../utils';

const BlogItem: React.FC<BlogItemType> = ({ data, child }) => {
  const { title, description, author, createdAt } = data;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const readHandler = () => {
    dispatch(currentBlog({ blog: data }));
    navigate(urlPath.read);
  };

  const date = JSON.stringify(createdAt);

  return (
    <div
      onClick={readHandler}
      className='grid grid-cols-6 gap-1 border  duration-300 ease-in-out shadow-md rounded-xl p-4'
    >
      <div className='col-span-1 flex justify-center items-center'>
        <img
          className='w-[3.5rem] h-[3.5rem] sm:w-[5rem] sm:h-[5rem] '
          src={'/Img.png'}
          alt='defaultImage'
        />
      </div>

      <div className='flex flex-col gap-2 justify-center  col-span-4'>
        <h2 className='text-sm sm:text-lg lg:text-xl font-semibold mb-1 line-clamp-1'>
          {title}
        </h2>
        <p className='text-xs sm:text-sm lg:text-base  line-clamp-3'>
          {description + '. . . . .'}
        </p>

        <div className='text-slate-500 text-xs sm:text-base flex gap-4  '>
          <p className='line-clamp-1'>Author : {author}</p>
          <p className='line-clamp-1'>{date}</p>
        </div>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className='col-span-1 flex justify-end items-center  gap-4 sm:gap-8  '
      >
        {child}
      </div>
    </div>
  );
};

export default BlogItem;
