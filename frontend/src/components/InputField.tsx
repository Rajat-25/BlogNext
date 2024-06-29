import React from 'react';

const InputField: React.FC<InputFieldType> = ({
  type,
  id,
  value,
  extraClass,
  name,
  changeHandler,
}) => {
  const orgClass = ' focus:outline-none border rounded-full ' + extraClass;
  return (
    <input
      required
      name={name}
      onChange={changeHandler}
      value={value}
      type={type}
      id={id}
      className={orgClass}
    />
  );
};

export default InputField;
