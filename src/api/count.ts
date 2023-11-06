import axios from 'axios';

export interface RunningCount {
    runningSeconds?: number;
    totalHandle?: number;
    totalPixivPush?: number;
    totalPixivScan?: number;
    totalPixivScanError?: number;
}

export const getRunningCount = function () {
    return axios.get<RunningCount>('/api/count/running');
};