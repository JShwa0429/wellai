import axios, { AxiosInstance, AxiosPromise } from 'axios';
import type * as Api from './common';

interface requestApiOptions {
  readonly course: AxiosInstance;
  readonly recommendCourse: () => AxiosPromise<Api.detailResponse>;
  readonly getCourse: () => AxiosPromise<Api.courseList>;
  readonly getDetailInformation: (id: string | undefined) => AxiosPromise<Api.detailResponse>;
  readonly getReview: (id: string | undefined) => AxiosPromise<Api.reviewReponse>;
  postReview: (id: string | undefined, reviewData: Api.reviewRequest) => AxiosPromise<Api.review>;
  putReview: (id: string, reviewData: Api.reviewRequest) => AxiosPromise<Api.review>;
  readonly deleteReview: (id: string) => AxiosPromise<void>;
  readonly getExercise: (id: string) => AxiosPromise<Api.exercise>;
  postBookmark: (id: string) => AxiosPromise<Api.review>;
  deleteBookmark: (id: string) => void;
}

export const CourseApi = (): requestApiOptions => {
  const course = axios.create({
    headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ2NzQ4MjYxLCJpYXQiOjE2NDY1NjgyNjEsImp0aSI6ImM0NzliMjUwMDllOTQyN2E5NjIwNGRkYzgxYzJiMTBmIiwidXNlcl9pZCI6Mn0.wgFmcAFctfVPP1Nm9LrqWzzGn0PPPHX_HZgyTv03O9k`,
    },
    baseURL: '/api/course',
  });
  return {
    course,
    getCourse: () => course.get(`/list`),
    recommendCourse: () => course.get(`/recommend`),
    getDetailInformation: (id) => course.get(`/${id}`),
    getReview: (id) => course.get(`/${id}/review`),
    postReview: (id, reviewData) =>
      course.post(`/${id}/review`, {
        content: reviewData.content,
        rating: reviewData.rating,
        course_id: reviewData.course_id,
      }),
    putReview: (id, reviewData) =>
      course.put(`/review/${id}`, {
        content: reviewData.content,
        rating: reviewData.rating,
      }),
    deleteReview: (id) => course.delete(`/review/${id}`),
    getExercise: (id) => course.get(`/exercise/${id}`),
    postBookmark: (id) =>
      course.post(`/bookmark`, {
        course_id: id,
      }),
    deleteBookmark: (id) => course.delete(`/bookmark/${id}`),
  };
};
