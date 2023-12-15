import axios from 'axios';

export interface SugarTagData {
    id: number;
    keyword: string;
    bindTags: string;
}

export interface AddSugarTagParam {
    keyword: string;
    bindTags: string;
}

export function getSugarTags() {
    return axios.get<SugarTagData[]>('/api/sugar/list/tag');
}

export function addSugarTag(param: AddSugarTagParam) {
    return axios.post<any>('/api/sugar/add/tag', param);
}

export function delSugarTag(ids: number[]) {
    return axios.post<any>('/api/sugar/del/tag', ids);
}