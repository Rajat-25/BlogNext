import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Root: React.FC = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Root;
