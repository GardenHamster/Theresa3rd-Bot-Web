import axios from 'axios';
import { GeneralSetting, PixivSetting, PermissionsSetting } from '@/store/modules/setting/types';

export function getGeneralSetting() {
  return axios.get<GeneralSetting>('/api/config/get/general');
}

export function setGeneralSetting(setting: GeneralSetting) {
  return axios.post<GeneralSetting>('/api/config/set/general', setting);
}

export function getPixivSetting() {
  return axios.get<PixivSetting>('/api/config/get/pixiv');
}

export function setPixivSetting(setting: PixivSetting) {
  return axios.post<PixivSetting>('/api/config/set/pixiv', setting);
}

export function getPermissionsSetting() {
  return axios.get<PermissionsSetting>('/api/config/get/permissions');
}

export function setPermissionsSetting(setting: PermissionsSetting) {
  return axios.post<PermissionsSetting>('/api/config/set/permissions', setting);
}