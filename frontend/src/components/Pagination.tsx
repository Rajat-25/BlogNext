import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { expPathDefault } from '../utils';

const Pagination: React.FC<PaginationType> = ({ isPrev, isNext, pgNo }) => {
  const navigate = useNavigate();

  const prevHandler = () => {
    const pre = pgNo - 1;

    if (!isPrev) {
      const path = expPathDefault + `/${pre}`;
      navigate(path);
    }
  };

  const nextHandler = () => {
    const next = pgNo + 1;

    if (!isNext) {
      const path = expPathDefault + `/${next}`;
      navigate(path);
    }
  };

  const toPageOne = () => {
    navigate(expPathDefault + '/1');
  };

  return (
    <div className='flex justify-center items-center gap-4'>
      {isPrev ? null : (
        <ChevronLeftIcon
          onClick={prevHandler}
          className='hover:scale-125 size-6'
        />
      )}
      <div
        onClick={toPageOne}
        className='cursor-pointer hover:scale-105 text-xl'
      >
        1
      </div>
      {pgNo == 1 ? null : <div className='text-xl'>{pgNo}</div>}
      {isNext ? null : (
        <>
          <ChevronRightIcon
            onClick={nextHandler}
            className='hover:scale-125 size-6'
          />
        </>
      )}
    </div>
  );
};

export default Pagination;
