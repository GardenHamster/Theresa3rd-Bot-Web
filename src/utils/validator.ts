import cron from 'cron-validate'

export const rules = {
    useSeconds: true,
    useYears: false,
    useAliases: true,
    useBlankDay: true,
    useLastDayOfMonth: true,
    useLastDayOfWeek: true,
    useNearestWeekday: true,
    useNthWeekdayOfMonth: true,
    mustHaveBlankDayField: true,
};

export const cronRule = {
    validator: (value: string, callback: (error: string) => void) => {
        if (!value || value.length === 0) return;
        const cronResult = cron(value, { override: rules });
        if (!cronResult.isValid()) {
            callback('cron格式不正确');
        }
    }
};

export const proxyRule = {
    validator: (value: string, callback: (error: string) => void) => {
        if (!value || value.length === 0) return;
        const reg = new RegExp('^(http|https)://([a-zA-Z0-9.]+.)+([a-zA-Z]{2,5})(:[0-9]{1,5})?(/)?$');
        if (!reg.test(value)) {
            callback('http格式不正确');
        }
    }
}

export default { cronRule, proxyRule }
