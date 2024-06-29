import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ReadBlog: React.FC = () => {
  const { currentBlog } = useSelector((state: RootState) => state.blog_slice);
  const { title, description, author } = currentBlog as BlogResponseType;
  return (
    <div className='max-w-2xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg'>
      <h1 className='text-3xl font-bold mb-4'>{title}</h1>
      <div className='prose max-w-none'>
        <p>{description}</p>
      </div>

      <div className='flex justify-end'>
        <p className='text-slate-500 text-md'>{author}</p>
      </div>
    </div>
  );
};

export default ReadBlog;
