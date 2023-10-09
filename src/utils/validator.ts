import cron from 'cron-validate'

const cronRules = [{
    validator: (value: string, callback: (error: string) => void) => {
        const rules = {
            useSeconds: true,
            useYears: false,
            useAliases: true,
            useBlankDay: true,
            useLastDayOfMonth: true,
            useLastDayOfWeek: true,
            useNearestWeekday: true,
            useNthWeekdayOfMonth: true,
            mustHaveBlankDayField: true,
        }
        const cronResult = cron(value, { override: rules });
        if (!cronResult.isValid()) {
            callback('cron格式不正确');
        }
    }
}];

export default cronRules 
