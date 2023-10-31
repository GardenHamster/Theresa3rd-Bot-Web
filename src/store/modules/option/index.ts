import { defineStore } from 'pinia';
import { getResendOptions, getImgSizes, getTagMatchOptions, getPixivRandomOptions, getPixivUserScanOptions } from '@/api/option';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import { OptionState, OptionInfo } from './types';

const infoToOptions = (optionInfos: OptionInfo[]) => {
  const optionList: SelectOptionData[] = [];
  for (let i = 0; i < optionInfos.length; i += 1) {
    const option = optionInfos[i];
    const optionItem: SelectOptionData = { label: option.label, value: option.value };
    optionList.push(optionItem);
  }
  return optionList;
};

const stringToOptions = (stringArr: string[]) => {
  const optionList: SelectOptionData[] = [];
  for (let i = 0; i < stringArr.length; i += 1) {
    const optionItem: SelectOptionData = { label: stringArr[i], value: stringArr[i] };
    optionList.push(optionItem);
  }
  return optionList;
};

const useOptionStore = defineStore('option', {
  state: (): OptionState => ({}),
  actions: {
    async loadImgSizes(): Promise<string[]> {
      if (this.imgSizes) return this.imgSizes;
      const sizes = (await getImgSizes()) as unknown as string[];
      this.imgSizes = sizes;
      return sizes;
    },
    async loadImgSizeOptions(): Promise<SelectOptionData[]> {
      const sizeArr = await this.loadImgSizes();
      return stringToOptions(sizeArr);
    },

    async loadResendInfos(): Promise<OptionInfo[]> {
      if (this.resendOptions) return this.resendOptions;
      const optionInfos = (await getResendOptions()) as unknown as OptionInfo[];
      this.resendOptions = optionInfos;
      return optionInfos;
    },
    async loadResendOptions(): Promise<SelectOptionData[]> {
      const optionInfos = await this.loadResendInfos();
      return infoToOptions(optionInfos);
    },

    async loadTagMatchInfos(): Promise<OptionInfo[]> {
      if (this.tagMatchOptions) return this.tagMatchOptions;
      const optionInfos = (await getTagMatchOptions()) as unknown as OptionInfo[];
      this.tagMatchOptions = optionInfos;
      return optionInfos;
    },
    async loadTagMatchOptions(): Promise<SelectOptionData[]> {
      const optionInfos = await this.loadTagMatchInfos();
      return infoToOptions(optionInfos);
    },

    async loadPixivRandomInfos(): Promise<OptionInfo[]> {
      if (this.pixivRandomOptions) return this.pixivRandomOptions;
      const optionInfos = (await getPixivRandomOptions()) as unknown as OptionInfo[];
      this.pixivRandomOptions = optionInfos;
      return optionInfos;
    },
    async loadPixivRandomOptions(): Promise<SelectOptionData[]> {
      const optionInfos = await this.loadPixivRandomInfos();
      return infoToOptions(optionInfos);
    },

    async loadPixivUserScanInfos(): Promise<OptionInfo[]> {
      if (this.pixivUserScanOptions) return this.pixivUserScanOptions;
      const optionInfos = (await getPixivUserScanOptions()) as unknown as OptionInfo[];
      this.pixivUserScanOptions = optionInfos;
      return optionInfos;
    },
    async loadPixivUserScanOptions(): Promise<SelectOptionData[]> {
      const optionInfos = await this.loadPixivUserScanInfos();
      return infoToOptions(optionInfos);
    },

  },
});

export default useOptionStore;
