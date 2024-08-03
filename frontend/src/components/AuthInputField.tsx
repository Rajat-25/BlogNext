import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import InputField from './InputField';

const AuthInputField = <T,>({
  fieldData,
  inputData,
  callFn,
  title,
  directTo,
  subTitle,
  errMsg,
  isError,
}: AuthFieldTypes<T>) => {
  const [userData, setUserData] = useState<T>(inputData);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const renderedItems = fieldData.map(
    ({ key, id, placeholder, type, label, name }) => {
      const idx = name as keyof T;
      const val = userData[idx] as string;

      return (
        <div className='flex flex-col gap-3' key={key}>
          <label htmlFor={id} className='text-sm md:text-base '>
            {label}
          </label>

          <InputField
            changeHandler={onChangeHandler}
            extraClass='p-2'
            placeholder={placeholder}
            name={name}
            type={type}
            id={id}
            value={val}
          />
        </div>
      );
    }
  );

  return (
    <div className='w-[20rem] sm:w-[22.5rem] p-8  flex flex-col shadow-xl border gap-4 rounded-lg'>
      <div className='flex justify-center'>
        <h2 className='text-lg md:text-2xl font-medium'>{title}</h2>
      </div>

      {isError ? <div className='text-base text-red-700'>{errMsg}</div> : null}
      {renderedItems}

      <Button
        extraClass='text-white p-2 text-base md:text-lg font-semibold '
        btnType='submit'
        btnVariant='primary'
        text='Submit'
        onClickHandler={() => callFn(userData)}
      />
      <p className='flex justify-center text-sm md:text-[1rem]'>
        {subTitle}
        <Link to={directTo} className=''>
          {title == 'Sign Up' ? <>&nbsp;Sign In</> : <>&nbsp;Sign Up</>}
        </Link>
      </p>
    </div>
  );
};

export default AuthInputField;
