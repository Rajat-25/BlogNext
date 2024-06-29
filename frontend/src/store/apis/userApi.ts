import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
  reducerPath: 'user_api',

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_USER_URL,
  }),

  endpoints(builder) {
    return {
      SignInReq: builder.mutation<LogInResponseType, SignInType>({
        query: (body) => {
          return {
            method: 'POST',
            url: '/user/signin',
            body,
          };
        },
      }),

      SignUpReq: builder.mutation<LogInResponseType, SignUpType>({
        query: (body) => {
          return {
            method: 'POST',
            url: '/user/signup',
            body,
          };
        },
      }),
    };
  },
});

export const userReducer = userApi.reducer;

export const { useSignInReqMutation, useSignUpReqMutation } = userApi;

export default userApi;
