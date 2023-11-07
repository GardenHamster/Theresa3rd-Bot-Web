import axios from 'axios';

export interface RunningCount {
    runningSeconds?: number;
    handleTimes?: number;
    pixivPushTimes?: number;
    pixivScanTimes?: number;
    pixivScanError?: number;
}

export interface SubscribeCount {
    pixivUserSubs?: number;
    pixivTagSubs?: number;
    mysUserSubs?: number;
}

export const getSingleCount = function () {
    return axios.get<RunningCount>('/api/count/single');
};

export const getTotalCount = function () {
    return axios.get<RunningCount>('/api/count/total');
};

export const getSubscribeCount = function () {
    return axios.get<RunningCount>('/api/count/subscribe');
};