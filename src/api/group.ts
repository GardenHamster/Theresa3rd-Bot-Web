import axios from 'axios';
import { GroupInfo } from '@/store/modules/group/types';

const getGroupList = function () {
  return axios.get<GroupInfo[]>('/api/group/list');
};

const loadGroupList = function () {
  return axios.get<GroupInfo[]>('/api/group/load');
}

export { getGroupList, loadGroupList };
