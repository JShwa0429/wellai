import { Options } from 'type';

export interface validationRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface validationResponse {
  email: string;
  password: string;
  confirm_password: string;
  status_code: number;
}

export interface signupRequest {
  email: string;
  password: string;
  options: Options;
}

export interface signupResponse {
  status_code: number;
}

export interface courseList {
  count: number;
  next: number | null;
  previous: number | null;
  results: detailResponse[];
}
export interface detailResponse {
  id: string;
  exercises: string[];
  hash_tag: { tag_name: string }[];
  course_name: string;
  img_url: string;
  avg_rating: number;
  count_review: number;
  description: string;
  stand_count: number;
  sit_count: number;
  balance_count: number;
  core_count: number;
  arm_count: number;
  recline_count: number;
}

export interface reviewReponse {
  count: number;
  next: number;
  previous: number;
  results: review[];
}

export interface reviewRequest {
  content: string;
  rating: number;
  course_id: string | undefined;
}
export interface review {
  id: string;
  user_id: string;
  created_at: string;
  modified_at: string;
  content: string;
  rating: number;
  course_id: string;
}

export interface exercise {
  id: number;
  exercise_name: string;
  youtube_key: string;
  exercise_type: string;
  exercise_level: string;
  description: string;
}
