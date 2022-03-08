import { Options } from 'http-proxy-middleware';
import { OptionType } from 'type';

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
  options: OptionType;
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
  is_bookmarked: boolean;
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

export interface reportYear {
  id: string;
  email: string;
  nickname: string;
  year_exercise_duration: number;
  year_calories: number;
  months_exercise_duration: {
    month: number;
    total: number;
  }[];
  months_calories: {
    month: number;
    total: number;
  }[];
}

export interface record {
  exercise_week: number;
  exercise_day: number;
  exercise_date: string;
  year: number;
  month: number;
  day: number;
  exercise_duration: number;
  calories_total: number;
}
export interface reportMonth {
  id: string;
  email: string;
  nickname: string;
  month_exercise_time: number;
  month_calories: number;
  records: record[];
}

export interface bookmark {
  id: string;
  course_id: detailResponse;
  created_at: string;
  modified_at: string;
}

export interface options extends OptionType {
  modified_at: string;
  created_at: string;
}
export interface userInformation {
  email: string;
  nickname: string;
  options: options;
}
