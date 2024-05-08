import axios from 'axios';
import { OptionInfo } from '@/store/modules/option/types';

export function getImgSizes() {
  return axios.get<string[]>('/api/option/list/imgsize');
}

export function getResendOptions() {
  return axios.get<OptionInfo[]>('/api/option/list/resend');
}

export function getTagMatchOptions() {
  return axios.get<OptionInfo[]>('/api/option/list/tag/match');
}

export function getPixivRandomOptions() {
  return axios.get<OptionInfo[]>('/api/option/list/pixiv/random');
}

export function getPixivUserScanOptions() {
  return axios.get<OptionInfo[]>('/api/option/list/pixiv/user/scan');
}

export function getSetuSourceOptions() {
  return axios.get<OptionInfo[]>('/api/option/list/timing/setu/source');
}

export function getPixivRankingSortOptions() {
  return axios.get<OptionInfo[]>('/api/option/list/pixiv/ranking/sort');
}

export function getDictionaryTypeOptions() {
  return axios.get<OptionInfo[]>('/api/option/list/dictionary/type');
}