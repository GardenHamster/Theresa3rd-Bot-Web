import { padLeft } from './string';

export const getTimeStr = (total: number): string => {
    const second = (total % 60).toFixed();
    const minute = ((total / 60) % 60).toFixed();
    const hour = (total / 60 / 60).toFixed();
    return `${padLeft(hour, '0', 2)}:${padLeft(minute, '0', 2)}:${padLeft(second, '0', 2)}`;
}

export default { getTimeStr } 