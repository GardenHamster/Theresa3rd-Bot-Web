import axios from 'axios';

export interface SubscribeData {
  groupId: number;
  subscribeCode: string;
  subscribeId: number;
  subscribeName: string;
  subscribeSubType: number;
  subscribeType: number;
}

export interface CancleParam {
  subscribeIds: number[];
}

export function getPixivUserSubscribe() {
  return axios.get<SubscribeData[]>('/api/subscribe/list/pixiv/user');
}

export function getPixivTagSubscribe() {
  return axios.get<SubscribeData[]>('/api/subscribe/list/pixiv/tag');
}

export function getMiyousheUserSubscribe() {
  return axios.get<SubscribeData[]>('/api/subscribe/list/miyoushe/user');
}

export function cancleSubscribe(data: number[]) {
  const requestData: CancleParam = { subscribeIds: data };
  return axios.post<any>('/api/subscribe/cancle', requestData);
}
