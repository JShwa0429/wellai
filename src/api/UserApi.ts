import axios, { AxiosInstance, AxiosPromise } from 'axios';
import type * as Api from './common';

interface requestApiOptions {
  readonly user: AxiosInstance;
  checkValidation: (userAccountInfo: Api.validationRequest) => AxiosPromise<Api.validationResponse>;
  signUpAccount: (signUp: Api.signupRequest) => AxiosPromise<Api.signupResponse>;
  logIn: (email: string, password: string) => AxiosPromise<{ refresh: string; access: string; nickname: string }>;
}

export const UserApi = (): requestApiOptions => {
  const user = axios.create({
    baseURL: '/api/users',
  });
  return {
    user,
    checkValidation: (userAccountInfo) =>
      user.post('/check', {
        email: userAccountInfo.email,
        password: userAccountInfo.password,
        confirm_password: userAccountInfo.confirmPassword,
      }),
    signUpAccount: (signUp) =>
      user.post('/register', {
        email: signUp.email,
        password: signUp.password,
        options: signUp.options,
      }),
    logIn: (email, password) =>
      user.post('/login', {
        email: email,
        password: password,
      }),
  };
};
