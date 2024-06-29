import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { ChangeEvent, useState } from 'react';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, str }) => {
  const [filterStr, setFilterStr] = useState<string>(str);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterStr(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className='flex border px-6 py-2 rounded-full '>
      <input
        onChange={onChangeHandler}
        className='w-full focus:outline-none '
        type='text'
        value={filterStr}
        placeholder='Search...'
      />
      <MagnifyingGlassIcon
        onClick={() => onSearch(filterStr)}
        className='size-6'
      />
    </div>
  );
};

export default SearchBar;
