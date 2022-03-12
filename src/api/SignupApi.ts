import axios, { AxiosInstance, AxiosPromise } from 'axios';
import type * as Api from './common';
import putInterceptor from '../utils/requestInterceptor';

interface requestApiOptions {
  readonly signup: AxiosInstance;
  checkValidation: (userAccountInfo: Api.validationRequest) => AxiosPromise<Api.validationResponse>;
  signUpAccount: (signUp: Api.signupRequest) => AxiosPromise<Api.signupResponse>;
}

export const SignUpApi = (): requestApiOptions => {
  const signup = axios.create({
    baseURL: `${process.env.REACT_APP_NEXT_PUBLIC_BASE_URL}/users`,
  });
  putInterceptor(signup);
  return {
    signup,
    checkValidation: (userAccountInfo) =>
      signup.post('/check', {
        email: userAccountInfo.email,
        password: userAccountInfo.password,
        confirm_password: userAccountInfo.confirmPassword,
      }),
    signUpAccount: (signUp) =>
      signup.post('/register', {
        email: signUp.email,
        password: signUp.password,
        options: signUp.options,
      }),
  };
};
