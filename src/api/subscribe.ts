import axios from 'axios';

export interface DataType {
  groupId: number;
  subscribeCode: string;
  subscribeId: number;
  subscribeName: string;
  subscribeSubType: number;
  subscribeType: number;
}

export function getPixivUserSubscribe() {
  return axios.get<DataType[]>('/api/subscribe/get/pixiv/user');
}
