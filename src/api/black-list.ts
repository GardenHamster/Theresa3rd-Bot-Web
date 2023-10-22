import axios from 'axios';

export interface BanMemberData {
    id: number;
    memberId: number;
    createAt: number;
    createDate: string;
}

export interface BanTagData {
    id: number;
    keyWord: string;
    fullMatch: boolean;
    isRegular: boolean;
    createDate: string;
}

export interface AddMemberParam {
    memberId: string;
}

export interface AddTagParam {
    keyword: string;
    tagMatchType: number;
}

export function getBanMembers() {
    return axios.get<BanMemberData[]>('/api/blacklist/list/member');
}

export function getBanTags() {
    return axios.get<BanTagData[]>('/api/blacklist/list/tag');
}

export function addBanMember(param: AddMemberParam) {
    return axios.post<any>('/api/blacklist/add/member', param);
}

export function addBanTag(param: AddMemberParam) {
    return axios.post<any>('/api/blacklist/add/tag', param);
}

export function delBanMember(ids: number[]) {
    return axios.post<any>('/api/blacklist/del/member', ids);
}

export function delBanTag(ids: number[]) {
    return axios.post<any>('/api/blacklist/del/tag', ids);
}
