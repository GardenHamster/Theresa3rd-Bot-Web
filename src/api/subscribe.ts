import axios from 'axios';

export interface SubscribeData {
  id: number;
  groupId: number;
  subscribeCode: string;
  subscribeId: number;
  subscribeName: string;
  subscribeSubType: number;
  subscribeType: number;
  subscribeAt: number;
  subscribeDate: string;
  subscribeGroup: string;
}

export interface DeleteParam {
  ids: number[];
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

export function deleteSubscribe(data: number[]) {
  const requestData: DeleteParam = { ids: data };
  return axios.post<any>('/api/subscribe/delete', requestData);
}
