import axios from 'axios';
import { GeneralSetting, PixivSetting, PermissionsSetting, ManageSetting } from '@/store/modules/setting/types';
import { MenuSetting, RepeaterSetting, WelcomeSetting, ReminderSetting } from '@/store/modules/setting/types';

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

export function getManageSetting() {
  return axios.get<ManageSetting>('/api/config/get/manage');
}

export function setManageSetting(setting: ManageSetting) {
  return axios.post<ManageSetting>('/api/config/set/manage', setting);
}

export function getMenuSetting() {
  return axios.get<MenuSetting>('/api/config/get/menu');
}

export function setMenuSetting(setting: MenuSetting) {
  return axios.post<MenuSetting>('/api/config/set/menu', setting);
}

export function getRepeaterSetting() {
  return axios.get<RepeaterSetting>('/api/config/get/repeater');
}

export function setRepeaterSetting(setting: RepeaterSetting) {
  return axios.post<RepeaterSetting>('/api/config/set/repeater', setting);
}

export function getWelcomeSetting() {
  return axios.get<WelcomeSetting>('/api/config/get/welcome');
}

export function setWelcomeSetting(setting: WelcomeSetting) {
  return axios.post<WelcomeSetting>('/api/config/set/welcome', setting);
}

export function getReminderSetting() {
  return axios.get<ReminderSetting>('/api/config/get/reminder');
}

export function setReminderSetting(setting: ReminderSetting) {
  return axios.post<ReminderSetting>('/api/config/set/reminder', setting);
}