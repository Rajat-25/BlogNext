import React from 'react';

const AuthLayout: React.FC<AuthLayoutType> = ({ children }) => {
  return (
    <div className='flex-grow grid grid-cols-1 md:grid md:grid-cols-2   ' >
      <div className='hidden text-xl text-slate-700 font-semibold bg-slate-300  md:flex md:justify-center md:items-center '>
        <blockquote className=''>
          "Write what you know, share what you learn." — Unknown
        </blockquote>
      </div>
      <div className='flex justify-center items-center'>{children}</div>
    </div>
  );
};

export default AuthLayout;
