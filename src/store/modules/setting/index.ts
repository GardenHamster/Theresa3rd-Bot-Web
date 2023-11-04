import { defineStore } from 'pinia';
import { getGeneralSetting, setGeneralSetting } from '@/api/settings';
import { getPixivSetting, setPixivSetting } from '@/api/settings';
import { getPermissionsSetting, setPermissionsSetting } from '@/api/settings';
import { getManageSetting, setManageSetting } from '@/api/settings';
import { getMenuSetting, setMenuSetting } from '@/api/settings';
import { getRepeaterSetting, setRepeaterSetting } from '@/api/settings';
import { getWelcomeSetting, setWelcomeSetting } from '@/api/settings';
import { getReminderSetting, setReminderSetting } from '@/api/settings';
import { getSetuSetting, setSetuSetting } from '@/api/settings';
import { getSaucenaoSetting, setSaucenaoSetting } from '@/api/settings';
import { getSubscribeSetting, setSubscribeSetting } from '@/api/settings';
import { getTimingSetuSetting, setTimingSetuSetting } from '@/api/settings';
import { getPixivRankingSetting, setPixivRankingSetting } from '@/api/settings';
import { getWordCloudSetting, setWordCloudSetting } from '@/api/settings';
import { SettingState, GeneralSetting, PixivSetting, PermissionsSetting, ManageSetting } from './types';
import { MenuSetting, RepeaterSetting, WelcomeSetting, ReminderSetting, SetuSetting } from './types';
import { SaucenaoSetting, SubscribeSetting, TimingSetuSetting, PixivRankingSetting, WordCloudSetting } from './types';

const useSettingStore = defineStore('setting', {
  state: (): SettingState => ({}),
  actions: {
    async loadGeneralSetting(): Promise<GeneralSetting> {
      this.generalSetting = (await getGeneralSetting()) as unknown as GeneralSetting;
      return this.generalSetting;
    },
    async saveGeneralSetting(setting: GeneralSetting) {
      await setGeneralSetting(setting);
      this.generalSetting = setting;
    },

    async loadPixivSetting(): Promise<PixivSetting> {
      this.pixivSetting = (await getPixivSetting()) as unknown as PixivSetting;
      return this.pixivSetting;
    },
    async savePixivSetting(setting: PixivSetting) {
      await setPixivSetting(setting);
      this.pixivSetting = setting;
    },

    async loadPermissionsSetting(): Promise<PermissionsSetting> {
      this.permissionsSetting = (await getPermissionsSetting()) as unknown as PermissionsSetting;
      return this.permissionsSetting;
    },
    async savePermissionsSetting(setting: PermissionsSetting) {
      await setPermissionsSetting(setting);
      this.permissionsSetting = setting;
    },

    async loadManageSetting(): Promise<ManageSetting> {
      this.manageSetting = (await getManageSetting()) as unknown as ManageSetting;
      return this.manageSetting;
    },
    async saveManageSetting(setting: ManageSetting) {
      await setManageSetting(setting);
      this.manageSetting = setting;
    },

    async loadMenuSetting(): Promise<MenuSetting> {
      this.menuSetting = (await getMenuSetting()) as unknown as MenuSetting;
      return this.menuSetting;
    },
    async saveMenuSetting(setting: MenuSetting) {
      await setMenuSetting(setting);
      this.menuSetting = setting;
    },

    async loadRepeaterSetting(): Promise<RepeaterSetting> {
      this.repeaterSetting = (await getRepeaterSetting()) as unknown as RepeaterSetting;
      return this.repeaterSetting;
    },
    async saveRepeaterSetting(setting: RepeaterSetting) {
      await setRepeaterSetting(setting);
      this.repeaterSetting = setting;
    },

    async loadWelcomeSetting(): Promise<WelcomeSetting> {
      this.welcomeSetting = (await getWelcomeSetting()) as unknown as WelcomeSetting;
      return this.welcomeSetting;
    },
    async saveWelcomeSetting(setting: WelcomeSetting) {
      await setWelcomeSetting(setting);
      this.welcomeSetting = setting;
    },

    async loadReminderSetting(): Promise<ReminderSetting> {
      this.reminderSetting = (await getReminderSetting()) as unknown as ReminderSetting;
      return this.reminderSetting;
    },
    async saveReminderSetting(setting: ReminderSetting) {
      await setReminderSetting(setting);
      this.reminderSetting = setting;
    },

    async loadSetuSetting(): Promise<SetuSetting> {
      const setuSetting = (await getSetuSetting()) as unknown as SetuSetting;
      if (!setuSetting.pixiv) setuSetting.pixiv = { enable: false };
      if (!setuSetting.lolicon) setuSetting.lolicon = { enable: false };
      if (!setuSetting.lolisuki) setuSetting.lolisuki = { enable: false };
      if (!setuSetting.local) setuSetting.local = { enable: false };
      if (!setuSetting.pixivUser) setuSetting.pixivUser = { enable: false };
      this.setuSetting = setuSetting
      return this.setuSetting;
    },
    async saveSetuSetting(setting: SetuSetting) {
      await setSetuSetting(setting);
      this.setuSetting = setting;
    },

    async loadSaucenaoSetting(): Promise<SaucenaoSetting> {
      this.saucenaoSetting = (await getSaucenaoSetting()) as unknown as SaucenaoSetting;
      return this.saucenaoSetting;
    },
    async saveSaucenaoSetting(setting: SaucenaoSetting) {
      await setSaucenaoSetting(setting);
      this.saucenaoSetting = setting;
    },

    async loadSubscribeSetting(): Promise<SubscribeSetting> {
      const subscribeSetting = (await getSubscribeSetting()) as unknown as SubscribeSetting;
      if (!subscribeSetting.miyoushe) subscribeSetting.miyoushe = { enable: false };
      if (!subscribeSetting.pixivUser) subscribeSetting.pixivUser = { enable: false };
      if (!subscribeSetting.pixivTag) subscribeSetting.pixivTag = { enable: false };
      this.subscribeSetting = subscribeSetting
      return this.subscribeSetting;
    },
    async saveSubscribeSetting(setting: SubscribeSetting) {
      await setSubscribeSetting(setting);
      this.subscribeSetting = setting;
    },

    async loadTimingSetuSetting(): Promise<TimingSetuSetting> {
      this.timingSetuSetting = (await getTimingSetuSetting()) as unknown as TimingSetuSetting;
      return this.timingSetuSetting;
    },
    async saveTimingSetuSetting(setting: TimingSetuSetting) {
      await setTimingSetuSetting(setting);
      this.timingSetuSetting = setting;
    },

    async loadPixivRankingSetting(): Promise<PixivRankingSetting> {
      const pixivRankingSetting = (await getPixivRankingSetting()) as unknown as PixivRankingSetting;
      if (!pixivRankingSetting.daily) pixivRankingSetting.daily = { enable: false };
      if (!pixivRankingSetting.dailyAI) pixivRankingSetting.dailyAI = { enable: false };
      if (!pixivRankingSetting.weekly) pixivRankingSetting.weekly = { enable: false };
      if (!pixivRankingSetting.monthly) pixivRankingSetting.monthly = { enable: false };
      if (!pixivRankingSetting.male) pixivRankingSetting.male = { enable: false };
      if (!pixivRankingSetting.subscribes) pixivRankingSetting.subscribes = [];
      this.pixivRankingSetting = pixivRankingSetting;
      return this.pixivRankingSetting;
    },
    async savePixivRankingSetting(setting: PixivRankingSetting) {
      await setPixivRankingSetting(setting);
      this.pixivRankingSetting = setting;
    },

    async loadWordCloudSetting(): Promise<WordCloudSetting> {
      this.wordCloudSetting = (await getWordCloudSetting()) as unknown as WordCloudSetting;
      return this.wordCloudSetting;
    },
    async saveWordCloudSetting(setting: WordCloudSetting) {
      await setWordCloudSetting(setting);
      this.wordCloudSetting = setting;
    },

  },
});

export default useSettingStore;
