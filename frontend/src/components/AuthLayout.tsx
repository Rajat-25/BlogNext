import React from 'react';

const AuthLayout: React.FC<AuthLayoutType> = ({ children }) => {
  return (
    <div className='h-screen w-screen grid grid-cols-2'>
      <div className='flex justify-center items-center text-xl text-slate-700 font-semibold bg-slate-300'>
        <blockquote className=''>
          "Write what you know, share what you learn." — Unknown
        </blockquote>
      </div>
      <div className='flex justify-center items-center'>{children}</div>
    </div>
  );
};

export default AuthLayout;
