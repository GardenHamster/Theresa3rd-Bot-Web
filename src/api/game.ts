import axios from 'axios';

export interface UCWordsData {
  id: number;
  word1: string;
  word2: string;
  isAuthorized: boolean;
  createMember: number;
  createAt: number;
}

export interface AddUCWordsParam {
  word1: string;
  word2: string;
}

export interface DeleteParam {
  ids: number[];
}

export interface AuthParam {
  ids: number[];
}

export function getUndercoverWords() {
  return axios.get<UCWordsData[]>('/api/game/list/undercover/words');
}

export function addUndercoverWords(param: AddUCWordsParam) {
  return axios.post<any>('/api/game/add/undercover/words', param);
}

export function authUndercoverWords(data: number[]) {
  const param: AuthParam = { ids: data };
  return axios.post<any>('/api/game/auth/undercover/words', param);
}

export function deleteUndercoverWords(data: number[]) {
  const param: DeleteParam = { ids: data };
  return axios.post<any>('/api/game/delete/undercover/words', param);
}
