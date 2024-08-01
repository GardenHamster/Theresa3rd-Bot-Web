import axios from 'axios';

export interface LogRecord {
    remind?: string;
    message?: string;
    innerMessage?: string;
    stackTrace?: string;
    createAt?: number;
    level?: number;
}

export const listLog = function () {
    return axios.get<LogRecord[]>('/api/log/list');
};

export const pullLog = function (lastAt: number) {
    return axios.get<LogRecord[]>(`/api/log/pull?lastAt=${lastAt}`);
};
