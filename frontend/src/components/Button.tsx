import React from 'react';

const Button: React.FC<BtnType> = ({
  btnType,
  btnVariant,
  text,
  extraClass,
  onClickHandler,
}) => {
  const btnColor = {
    primary: 'bg-blue-400',
    danger: 'bg-red-500',
    success: 'bg-green-500',
    plain: 'bg-white',
  };
  const style: string =
    ' hover:scale-105 rounded-full focus:outline-none focus:scale-105 ' +
    btnColor[btnVariant] +
    ' ' +
    extraClass;
   
  return (
    <button
      type={btnType ? btnType : 'button'}
      onClick={onClickHandler}
      className={style}
    >
      {text}
    </button>
  );
};

export default Button;
