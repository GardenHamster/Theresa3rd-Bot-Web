import { padLeft } from './string';

export const getTimeStr = (total: number): string => {
    if (!total) total = 0;
    const second = (total % 60).toFixed();
    const minute = ((total / 60) % 60).toFixed();
    const hour = ((total / 60 / 60) % 24).toFixed();
    const day = (total / 60 / 60 / 24).toFixed();
    return `${day}天${padLeft(hour, '0', 2)}时${padLeft(minute, '0', 2)}分${padLeft(second, '0', 2)}秒`;
}

export default { getTimeStr } 