import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthInputField from '../components/AuthInputField';
import AuthLayout from '../components/AuthLayout';
import { logInUser, useSignInReqMutation } from '../store';
import { expPathDefault } from '../utils';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signInReq,data] = useSignInReqMutation();

  const fieldData: FieldTypeSi[] = [
    {
      type: 'email',
      placeholder: 'Your Email ..',
      label: 'Email',
      id: 'email_si',
      key: 'email_sik',
      name: 'email',
    },
    {
      type: 'password',
      placeholder: 'Your Password ..',
      label: 'Password',
      id: 'password_si',
      key: 'password_sik',
      name: 'password',
    },
  ];

  const inputData: SignInType = {
    email: '',
    password: '',
  };

  const callFn = async (arg: SignInType) => {
    const { token,data }: LogInResponseType = await signInReq(arg).unwrap();
    if (token && data) {
      dispatch(logInUser({ token,data }));
      navigate(expPathDefault+'/1');
    }
  };

  return (
    <AuthLayout>
      <AuthInputField
        title='Sign In'
        subTitle={`Don't have an account ?`}
        directTo='/signup'
        callFn={callFn}
        fieldData={fieldData}
        inputData={inputData}
        isError={data.isError}
        errMsg='! Recheck your Email/Password '
      />
    </AuthLayout>
  );
};

export default SignIn;
