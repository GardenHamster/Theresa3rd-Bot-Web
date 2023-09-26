import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

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

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}
