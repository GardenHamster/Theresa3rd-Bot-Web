import axios from 'axios';

export interface LoginParam {
  password: string;
}

export interface LoginResult {
  token: string;
  createAt: number;
  expiredAt: number;
  expiredSeconds: number;
}

export function userLogin(param: LoginParam) {
  return axios.post<LoginResult>('/api/user/login', param);
}

