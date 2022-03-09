import axios, { AxiosInstance, AxiosPromise } from 'axios';
import type * as Api from './common';

interface requestApiOptions {
  readonly signup: AxiosInstance;
  checkValidation: (userAccountInfo: Api.validationRequest) => AxiosPromise<Api.validationResponse>;
  signUpAccount: (signUp: Api.signupRequest) => AxiosPromise<Api.signupResponse>;
}

export const UserApi = (): requestApiOptions => {
  const signup = axios.create({
    baseURL: '/api/users',
  });
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
