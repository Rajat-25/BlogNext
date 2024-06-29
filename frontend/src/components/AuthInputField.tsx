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
        <div className='flex flex-col gap-5' key={key}>
          <label htmlFor={id} className=''>
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
    <div className='w-6/12 flex flex-col shadow-lg border   gap-4 p-6 rounded-lg'>
      <div className='flex justify-center'>
        <h2 className='text-2xl font-normal'>{title}</h2>
      </div>

      {isError ? <div className='text-md text-red-700'>{errMsg}</div> : null}
      {renderedItems}

      <Button
        extraClass='p-2 '
        btnType='submit'
        btnVariant='primary'
        text={title}
        onClickHandler={() => callFn(userData)}
      />
      <p className='flex justify-center'>
        {subTitle}
        <Link to={directTo}>
          {title == 'Sign Up' ? <>&nbsp;Sign In</> : <>&nbsp;Sign Up</>}
        </Link>
      </p>
    </div>
  );
};

export default AuthInputField;
