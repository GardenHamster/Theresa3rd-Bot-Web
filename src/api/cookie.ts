import axios from 'axios';

export interface CookieData {
  cookie: string;
}

export interface UpdateParam {
  cookie: string;
}

export function getPixivCookie() {
  return axios.get<CookieData>('/api/cookie/get/pixiv');
}

export function setPixivCookie(cookie: string) {
  const requestData: UpdateParam = { cookie };
  return axios.post<any>('/api/cookie/set/pixiv', requestData);
}

export function getSaucenaoCookie() {
  return axios.get<CookieData>('/api/cookie/get/saucenao');
}

export function setSaucenaoCookie(cookie: string) {
  const requestData: UpdateParam = { cookie };
  return axios.post<any>('/api/cookie/set/saucenao', requestData);
}
