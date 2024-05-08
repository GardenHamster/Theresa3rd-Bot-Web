import axios from 'axios';

export interface DictionaryData {
    id: number;
    words: string;
    createAt: number;
    wordType: number;
    subType: number;
}

export interface AddDictionaryParam {
    words: string[];
    wordType?: number;
    subType?: number;
}

export function getDictionary() {
    return axios.get<DictionaryData[]>('/api/dictionary/list');
}

export function addDictionary(param: AddDictionaryParam) {
    return axios.post<any>('/api/dictionary/add', param);
}

export function delDictionary(ids: number[]) {
    return axios.post<any>('/api/dictionary/del', ids);
}