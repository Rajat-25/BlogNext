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

  const style = 'w-[1.2rem] h-[1.2rem] md:w-[1.5rem] md:h-[1.5rem]';

  return (
    <div className='flex justify-center items-center gap-4 text-base sm:text-xl'>
      {isPrev ? null : (
        <ChevronLeftIcon onClick={prevHandler} className={style} />
      )}
      <div onClick={toPageOne} className='cursor-pointer hover:scale-105'>
        1
      </div>
      {pgNo == 1 ? null : <div className=''>{pgNo}</div>}
      {isNext ? null : (
        <>
          <ChevronRightIcon onClick={nextHandler} className={style} />
        </>
      )}
    </div>
  );
};

export default Pagination;
