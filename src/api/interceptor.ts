import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';

export interface HttpResponse<T = unknown> {
  error: boolean;
  code: number;
  message: string;
  data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

const backLogin = () => {
  Modal.error({
    title: '登录超时',
    content: '登录超时，请重新登录',
    okText: '确定',
    async onOk() {
      const userStore = useUserStore();
      await userStore.logout();
      window.location.reload();
    },
  });
};

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log('error', error);
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse<unknown>>) => {
    const result = response.data;
    if (result.code !== 0) {
      Message.error({
        content: result.message || 'Error',
        duration: 5 * 1000,
      });
      return Promise.reject(new Error(result.message || 'Error'));
    }
    return result.data;
  },
  (error) => {
    const errorJson = error.toJSON();
    if (errorJson.status === 401) {
      backLogin();
      return Promise.reject(error);
    }
    console.log(error);
    Message.error({
      content: error.msg || '请求失败',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
