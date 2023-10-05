import { defineStore } from 'pinia';
import { getGeneralSetting, setGeneralSetting } from '@/api/settings';
import { SettingState, GeneralSetting } from './types';

const useSettingStore = defineStore('setting', {
  state: (): SettingState => ({}),
  actions: {
    async loadGeneralSetting(): Promise<GeneralSetting> {
      if (this.generalSetting) return this.generalSetting;
      this.generalSetting = (await getGeneralSetting()) as unknown as GeneralSetting;
      return this.generalSetting;
    },
    async saveGeneralSetting(setting: GeneralSetting) {
      await setGeneralSetting(setting);
      this.generalSetting = setting;
    },
  },
});

export default useSettingStore;
