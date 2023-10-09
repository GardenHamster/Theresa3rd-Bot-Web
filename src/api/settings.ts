import axios from 'axios';
import { GeneralSetting, PixivSetting } from '@/store/modules/setting/types';

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
