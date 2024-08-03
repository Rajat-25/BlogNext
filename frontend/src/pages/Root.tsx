import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Root: React.FC = () => {
  return (
    <div className='min-h-dvh  flex flex-col'>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Root;
