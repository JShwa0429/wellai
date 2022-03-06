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
