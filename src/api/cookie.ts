import axios from 'axios';

export interface CookieData {
  cookie: string;
}

export interface CookieTokenData {
  cookie: string;
  token: string;
}

export interface CookieParam {
  cookie: string;
}

export interface CookieTokenParam {
  cookie: string;
  token: string;
}


export function getPixivCookie() {
  return axios.get<CookieData>('/api/cookie/get/pixiv');
}

export function setPixivCookie(cookie: string, token: string) {
  const requestData: CookieTokenParam = { cookie, token };
  return axios.post<any>('/api/cookie/set/pixiv', requestData);
}

export function getSaucenaoCookie() {
  return axios.get<CookieData>('/api/cookie/get/saucenao');
}

export function setSaucenaoCookie(cookie: string) {
  const requestData: CookieParam = { cookie };
  return axios.post<any>('/api/cookie/set/saucenao', requestData);
}
