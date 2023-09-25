import axios from 'axios';

export interface PixivUserSubscribe {
  groupId: number;
  subscribeCode: string;
  subscribeId: number;
  subscribeName: string;
  subscribeSubType: number;
  subscribeType: number;
}

export interface CancleSubscribeData {
  subscribeIds: number[];
}

export function getPixivUserSubscribe() {
  return axios.get<PixivUserSubscribe[]>('/api/subscribe/list/pixiv/user');
}

export function cancleSubscribe(data: number[]) {
  const requestData: CancleSubscribeData = { subscribeIds: data }
  return axios.post<any>('/api/subscribe/cancle', requestData);
}
