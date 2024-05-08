import { OptionInfo } from '@/store/modules/option/types';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';

export const infoToOptions = (optionInfos: OptionInfo[]) => {
    const optionList: SelectOptionData[] = [];
    for (let i = 0; i < optionInfos.length; i += 1) {
        const option = optionInfos[i];
        const optionItem: SelectOptionData = { label: option.label, value: option.value };
        optionList.push(optionItem);
    }
    return optionList;
};

export const stringToOptions = (stringArr: string[]) => {
    const optionList: SelectOptionData[] = [];
    for (let i = 0; i < stringArr.length; i += 1) {
        const optionItem: SelectOptionData = { label: stringArr[i], value: stringArr[i] };
        optionList.push(optionItem);
    }
    return optionList;
};

export default { infoToOptions, stringToOptions }