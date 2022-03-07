import axios, { AxiosInstance, AxiosPromise } from 'axios';
import type * as Api from './common';

interface requestApiOptions {
  readonly course: AxiosInstance;
  readonly recommendCourse: () => AxiosPromise<Api.detailResponse[]>;
  readonly getCourse: () => AxiosPromise<Api.courseList>;
  readonly searchCourse: (search: string) => AxiosPromise<Api.courseList>;
  readonly getDetailInformation: (id: string | undefined) => AxiosPromise<Api.detailResponse>;
  readonly getReview: (id: string) => AxiosPromise<Api.reviewReponse>;
  readonly getReviewOrdering: (id: string, ordering: string) => AxiosPromise<Api.reviewReponse>;
  postReview: (id: string, reviewData: Api.reviewRequest) => AxiosPromise<Api.review>;
  putReview: (id: string, reviewData: Api.reviewRequest) => AxiosPromise<Api.review>;
  readonly deleteReview: (id: string) => AxiosPromise<void>;
  readonly getExercise: (id: string) => AxiosPromise<Api.exercise>;
  postBookmark: (id: string) => AxiosPromise<Api.review>;
  deleteBookmark: (id: string) => AxiosPromise<void>;
}

export const CourseApi = (): requestApiOptions => {
  const course = axios.create({
    headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ2ODE2ODUwLCJpYXQiOjE2NDY2MzY4NTAsImp0aSI6IjkxNzJjYzNiNmY2ZTQxZTY4MzAzODM0NDU1MzA4NzU5IiwidXNlcl9pZCI6M30.HMbLH7BWpuhrP_rNj0OuAov940a8axW1F5wFUWrlsOg`,
    },
    baseURL: '/api/course',
  });
  return {
    course,
    getCourse: () => course.get(`/list`),
    recommendCourse: () => course.get(`/recommendation`),
    searchCourse: (search) =>
      course.get(`/list`, {
        params: { search: search },
      }),
    getDetailInformation: (id) => course.get(`/${id}`),
    getReview: (id) => course.get(`/${id}/review`),
    getReviewOrdering: (id, ordering) =>
      course.get(`/${id}/review`, {
        params: { ordering: ordering },
      }),
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
    deleteBookmark: (id) => course.delete(`/${id}/bookmark`),
  };
};
