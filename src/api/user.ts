import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  password: string;
}

export interface LoginResult {
  error: boolean;
  code: number;
  message: string;
  data: any;
}

export function login(data: LoginData) {
  return axios.post<LoginResult>('/api/user/login', data);
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}
