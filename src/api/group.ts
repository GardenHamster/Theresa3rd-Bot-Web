import axios from 'axios';

export interface DataType {
  groupId: number;
  groupName: string;
}

export function getGroupList() {
  return axios.get<DataType[]>('/api/group/list');
}
