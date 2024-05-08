import { defineStore } from 'pinia';
import { getResendOptions, getImgSizes, getTagMatchOptions, getPixivRandomOptions, getPixivUserScanOptions } from '@/api/option';
import { getSetuSourceOptions, getPixivRankingSortOptions, getDictionaryTypeOptions } from '@/api/option';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import { infoToOptions, stringToOptions } from '@/utils/options';
import { OptionState, OptionInfo } from './types';

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

    async loadSetuSourceInfos(): Promise<OptionInfo[]> {
      if (this.setuSourceOptions) return this.setuSourceOptions;
      const optionInfos = (await getSetuSourceOptions()) as unknown as OptionInfo[];
      this.setuSourceOptions = optionInfos;
      return optionInfos;
    },
    async loadSetuSourceOptions(): Promise<SelectOptionData[]> {
      const optionInfos = await this.loadSetuSourceInfos();
      return infoToOptions(optionInfos);
    },

    async loadPixivRankingSortInfos(): Promise<OptionInfo[]> {
      if (this.pixivRankingSortOptions) return this.pixivRankingSortOptions;
      const optionInfos = (await getPixivRankingSortOptions()) as unknown as OptionInfo[];
      this.pixivRankingSortOptions = optionInfos;
      return optionInfos;
    },
    async loadPixivRankingSortOptions(): Promise<SelectOptionData[]> {
      const optionInfos = await this.loadPixivRankingSortInfos();
      return infoToOptions(optionInfos);
    },

    async loadDictionaryTypeInfos(): Promise<OptionInfo[]> {
      if (this.dictionaryTypeOptions) return this.dictionaryTypeOptions;
      const optionInfos = (await getDictionaryTypeOptions()) as unknown as OptionInfo[];
      this.dictionaryTypeOptions = optionInfos;
      return optionInfos;
    },
    async loadDictionaryTypeOptions(): Promise<SelectOptionData[]> {
      const optionInfos = await this.loadDictionaryTypeInfos();
      return infoToOptions(optionInfos);
    },

  },
});

export default useOptionStore;
