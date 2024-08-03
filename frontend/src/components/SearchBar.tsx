import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { ChangeEvent, useState } from 'react';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, str }) => {
  const [filterStr, setFilterStr] = useState<string>(str);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterStr(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className=' flex border px-6 py-2 rounded-full '>
      <input
        onChange={onChangeHandler}
        className='w-full focus:outline-none text-xs sm:text-base lg:text-lg '
        type='text'
        value={filterStr}
        placeholder='Search...'
      />
      <MagnifyingGlassIcon
        onClick={() => onSearch(filterStr)}
        className='text-slate-400 w-[1rem] h-[1rem] sm:w-[1.4rem] sm:h-[1.4rem]'
      />
    </div>
  );
};

export default SearchBar;
