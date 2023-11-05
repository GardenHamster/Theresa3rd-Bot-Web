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

export default { cronRule }
