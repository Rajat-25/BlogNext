import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthInputField from '../components/AuthInputField';
import AuthLayout from '../components/AuthLayout';
import { logInUser, useSignUpReqMutation } from '../store';
import { expPathDefault, urlPath } from '../utils';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [SignUpReq, data ]  = useSignUpReqMutation();

  const fieldData: FieldTypeSi[] = [
    {
      type: 'text',
      placeholder: 'Enter Firstname ...',
      label: 'First Name',
      id: 'firstname_su',
      key: 'firstname_suk',
      name: 'firstName',
    },
    {
      type: 'text',
      placeholder: 'Enter Lastname ...',
      label: 'Last Name',
      id: 'lastname_su',
      key: 'lastname_suk',
      name: 'lastName',
    },
    {
      type: 'email',
      placeholder: 'Your Email ..',
      label: 'Email',
      id: 'email_su',
      key: 'email_suk',
      name: 'email',
    },
    {
      type: 'password',
      placeholder: 'Your Password ..',
      label: 'Password',
      id: 'password_su',
      key: 'password_suk',
      name: 'password',
    },
  ];

  const inputData: SignUpType = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };

  const callFn = async (arg: SignUpType) => {
    const { token, data }: LogInResponseType = await SignUpReq(arg).unwrap();
    if (token && data) {
      dispatch(logInUser({ token, data }));
      navigate(expPathDefault+'/1');
    }
  };

  return (
    <AuthLayout>
      <AuthInputField
        title='Sign Up'
        subTitle='Already have an account ?'
        directTo={urlPath.signin}
        callFn={callFn}
        fieldData={fieldData}
        inputData={inputData}
        isError={data.isError}
        errMsg='!! Invalid input'
      />
    </AuthLayout>
  );
};

export default SignUp;
