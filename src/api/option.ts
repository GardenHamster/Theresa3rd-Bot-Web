import axios from 'axios';
import { OptionInfo } from '@/store/modules/option/types';

export function getImgSizes() {
  return axios.get<string[]>('/api/option/list/imgsize');
}

export function getResendOptions() {
  return axios.get<OptionInfo[]>('/api/option/list/resend');
}
