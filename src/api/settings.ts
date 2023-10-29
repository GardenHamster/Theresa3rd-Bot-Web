import axios from 'axios';
import { GeneralSetting, PixivSetting, PermissionsSetting, ManageSetting } from '@/store/modules/setting/types';
import { MenuSetting, RepeaterSetting, WelcomeSetting, ReminderSetting } from '@/store/modules/setting/types';
import { SetuSetting, SaucenaoSetting, SubscribeSetting, TimingSetuSetting, } from '@/store/modules/setting/types';
import { PixivRankingSetting, WordCloudSetting } from '@/store/modules/setting/types';

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

export function getSetuSetting() {
  return axios.get<SetuSetting>('/api/config/get/setu');
}

export function setSetuSetting(setting: SetuSetting) {
  return axios.post<SetuSetting>('/api/config/set/setu', setting);
}

export function getSaucenaoSetting() {
  return axios.get<SaucenaoSetting>('/api/config/get/saucenao');
}

export function setSaucenaoSetting(setting: SaucenaoSetting) {
  return axios.post<SaucenaoSetting>('/api/config/set/saucenao', setting);
}

export function getSubscribeSetting() {
  return axios.get<SubscribeSetting>('/api/config/get/subscribe');
}

export function setSubscribeSetting(setting: SubscribeSetting) {
  return axios.post<SubscribeSetting>('/api/config/set/subscribe', setting);
}

export function getTimingSetuSetting() {
  return axios.get<TimingSetuSetting>('/api/config/get/timing/setu');
}

export function setTimingSetuSetting(setting: TimingSetuSetting) {
  return axios.post<TimingSetuSetting>('/api/config/set/timing/setu', setting);
}

export function getPixivRankingSetting() {
  return axios.get<PixivRankingSetting>('/api/config/get/pixiv/ranking');
}

export function setPixivRankingSetting(setting: PixivRankingSetting) {
  return axios.post<PixivRankingSetting>('/api/config/set/pixiv/ranking', setting);
}

export function getWordCloudSetting() {
  return axios.get<WordCloudSetting>('/api/config/get/wordcloud');
}

export function setWordCloudSetting(setting: WordCloudSetting) {
  return axios.post<WordCloudSetting>('/api/config/set/wordcloud', setting);
}