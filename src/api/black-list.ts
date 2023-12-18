import axios from 'axios';

export interface BanMemberData {
    id: number;
    memberId: number;
    createAt: number;
    createDate: string;
}

export interface BanTagData {
    id: number;
    keyword: string;
    fullMatch: boolean;
    isRegular: boolean;
    createDate: string;
}

export interface BanPixiverData {
    id: number;
    pixiverId: number;
    createAt: number;
    createDate: string;
}

export interface AddMemberParam {
    memberId: string;
}

export interface AddTagParam {
    keyword: string;
    tagMatchType: number;
}

export interface AddPixiverParam {
    pixiverId: string;
}

export function getBanMembers() {
    return axios.get<BanMemberData[]>('/api/blacklist/list/member');
}

export function getBanTags() {
    return axios.get<BanTagData[]>('/api/blacklist/list/tag');
}

export function getBanPixivers() {
    return axios.get<BanPixiverData[]>('/api/blacklist/list/pixiver');
}

export function addBanMember(param: AddMemberParam) {
    return axios.post<any>('/api/blacklist/add/member', param);
}

export function addBanTag(param: AddTagParam) {
    return axios.post<any>('/api/blacklist/add/tag', param);
}

export function addBanPixiver(param: AddPixiverParam) {
    return axios.post<any>('/api/blacklist/add/pixiver', param);
}

export function delBanMember(ids: number[]) {
    return axios.post<any>('/api/blacklist/del/member', ids);
}

export function delBanTag(ids: number[]) {
    return axios.post<any>('/api/blacklist/del/tag', ids);
}

export function delBanPixiver(ids: number[]) {
    return axios.post<any>('/api/blacklist/del/pixiver', ids);
}
