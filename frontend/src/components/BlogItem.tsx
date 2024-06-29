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

  return (
    <div
      onClick={readHandler}
      className='grid grid-cols-6 gap-1 border  duration-300 ease-in-out shadow-md rounded-xl px-8 py-4'
    >
      <div className='col-span-1'>
        <img className='w-28 h-28 ' src={'/Img.png'} alt='defaultImage' />
      </div>

      <div className='flex flex-col gap-3 justify-center  col-span-4'>
        <h2 className='text-xl font-semibold mb-1'>{title}</h2>
        <p className='text-justify'>
          {description.slice(0, 250) + '. . . . .'}
        </p>

        <div className='text-slate-500 flex gap-4 '>
          <p>Author : {author}</p>
          <p>{JSON.stringify(createdAt)}</p>
        </div>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className='flex justify-end gap-8  items-center col-span-1'
      >
        {child}
      </div>
    </div>
  );
};

export default BlogItem;
