import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import Button from './Button';
import InputField from './InputField';
import { urlPath } from '../utils';

const BlogForm: React.FC<BlogFormType> = ({ func, data }) => {
  const [formData, setFormData] = useState<BlogType>(data);
  const navigate = useNavigate();

  const { token, currentUser } = useSelector(
    (state: RootState) => state.user_slice
  );
  const { _id: id } = currentUser as CurrUserType;

  const changeHandler = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const blog = { ...formData, id };
    func({ token, blog });

    setFormData({
      title: '',
      description: '',
    });
    navigate(urlPath.blogs);
    e.stopPropagation();
  };

  return (
    <form className='mx-auto mt-8 w-[80%] border border-neutral-300 flex flex-col gap-6 p-4 rounded-xl  '>
      <div className='flex flex-col gap-4'>
        <label
          className='block text-base sm:text-lg lg:text-xl font-medium'
          htmlFor='title_edit'
        >
          Title
        </label>

        <InputField
          value={formData.title}
          name='title'
          id='title_edit'
          changeHandler={changeHandler}
          type='text'
          extraClass='w-full rounded p-2 focus:outline-none focus:ring focus:border-blue-300'
        />
      </div>

      <div className='flex flex-col gap-4'>
        <label
          className='block text-base sm:text-lg lg:text-xl font-medium'
          htmlFor='description_edit'
        >
          Description
        </label>

        <textarea
          required
          name='description'
          onChange={changeHandler}
          id='description_edit'
          className=' h-40 w-full rounded-md p-2 focus:outline-none
      focus:ring focus:border-blue-300'
          value={formData.description}
        />
      </div>

      <Button
        onClickHandler={submitHandler}
        extraClass='p-2 m-2 text-white w-full text-base sm:text-lg lg:text-xl font-medium'
        btnVariant='primary'
        text='Submit'
      />
    </form>
  );
};

export default BlogForm;
