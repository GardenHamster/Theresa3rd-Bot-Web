import axios from 'axios';

export function getFontPaths() {
  return axios.get<string[]>('/api/path/list/font');
}

export function getFacePaths() {
  return axios.get<string[]>('/api/path/list/face');
}

export function getMaskPaths() {
  return axios.get<string[]>('/api/path/list/mask');
}
