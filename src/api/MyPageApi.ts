import axios, { AxiosInstance, AxiosPromise } from 'axios';
import { OptionType } from 'type';
import type * as Api from './common';

interface requestApiOptions {
  readonly mypage: AxiosInstance;
  readonly getRecordsYear: () => AxiosPromise<Api.reportYear[]>;
  readonly getRecordsMonth: (month: number, year: number) => AxiosPromise<Api.reportMonth[]>;
  readonly getUserInformation: () => AxiosPromise<Api.userInformation>;
  putUserInformation: (options: OptionType) => AxiosPromise<Api.options>;
}

export const MyPageApi = (): requestApiOptions => {
  const mypage = axios.create({
    baseURL: '/api/users',
  });
  return {
    mypage,
    getRecordsYear: () => mypage.get(`/records/year`),
    getRecordsMonth: (month, year) =>
      mypage.get(`/records/`, {
        params: {
          month: month,
          year: year,
        },
      }),
    getUserInformation: () => mypage.get('/option'),
    putUserInformation: (options) =>
      mypage.put('/option', {
        gender: options.gender,
        height: options.height,
        weight: options.weight,
        is_stand: options.is_stand,
        is_sit: options.is_sit,
        is_balance: options.is_balance,
        is_core: options.is_core,
        is_leg: options.is_leg,
        is_back: options.is_back,
      }),
  };
};
