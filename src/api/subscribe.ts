import axios from 'axios';

export interface PixivUserSubscribe {
  groupId: number;
  subscribeCode: string;
  subscribeId: number;
  subscribeName: string;
  subscribeSubType: number;
  subscribeType: number;
}

export function getPixivUserSubscribe() {
  return axios.get<PixivUserSubscribe[]>('/api/subscribe/list/pixiv/user');
}

// export function cancleSubscribe(data: number[]) {
//   return axios.post<LoginResult>('/api/user/login', data);
// }
