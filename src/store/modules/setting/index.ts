import { defineStore } from 'pinia';
import { getGeneralSetting, setGeneralSetting } from '@/api/settings';
import { getPixivSetting, setPixivSetting } from '@/api/settings';
import { getPermissionsSetting, setPermissionsSetting } from '@/api/settings';
import { getManageSetting, setManageSetting } from '@/api/settings';
import { getMenuSetting, setMenuSetting } from '@/api/settings';
import { getRepeaterSetting, setRepeaterSetting } from '@/api/settings';
import { getWelcomeSetting, setWelcomeSetting } from '@/api/settings';
import { SettingState, GeneralSetting, PixivSetting, PermissionsSetting, ManageSetting } from './types';
import { MenuSetting, RepeaterSetting, WelcomeSetting } from './types';

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

    async loadPixivSetting(): Promise<PixivSetting> {
      if (this.pixivSetting) return this.pixivSetting;
      this.pixivSetting = (await getPixivSetting()) as unknown as PixivSetting;
      return this.pixivSetting;
    },
    async savePixivSetting(setting: PixivSetting) {
      await setPixivSetting(setting);
      this.pixivSetting = setting;
    },

    async loadPermissionsSetting(): Promise<PermissionsSetting> {
      if (this.permissionsSetting) return this.permissionsSetting;
      this.permissionsSetting = (await getPermissionsSetting()) as unknown as PermissionsSetting;
      return this.permissionsSetting;
    },
    async savePermissionsSetting(setting: PermissionsSetting) {
      await setPermissionsSetting(setting);
      this.permissionsSetting = setting;
    },

    async loadManageSetting(): Promise<ManageSetting> {
      if (this.manageSetting) return this.manageSetting;
      this.manageSetting = (await getManageSetting()) as unknown as ManageSetting;
      return this.manageSetting;
    },
    async saveManageSetting(setting: ManageSetting) {
      await setManageSetting(setting);
      this.manageSetting = setting;
    },

    async loadMenuSetting(): Promise<MenuSetting> {
      if (this.menuSetting) return this.menuSetting;
      this.menuSetting = (await getMenuSetting()) as unknown as MenuSetting;
      return this.menuSetting;
    },
    async saveMenuSetting(setting: MenuSetting) {
      await setMenuSetting(setting);
      this.menuSetting = setting;
    },

    async loadRepeaterSetting(): Promise<RepeaterSetting> {
      if (this.repeaterSetting) return this.repeaterSetting;
      this.repeaterSetting = (await getRepeaterSetting()) as unknown as RepeaterSetting;
      return this.repeaterSetting;
    },
    async saveRepeaterSetting(setting: RepeaterSetting) {
      await setRepeaterSetting(setting);
      this.repeaterSetting = setting;
    },

    async loadWelcomeSetting(): Promise<WelcomeSetting> {
      if (this.welcomeSetting) return this.welcomeSetting;
      this.welcomeSetting = (await getWelcomeSetting()) as unknown as WelcomeSetting;
      return this.welcomeSetting;
    },
    async saveWelcomeSetting(setting: WelcomeSetting) {
      await setWelcomeSetting(setting);
      this.welcomeSetting = setting;
    },

  },
});

export default useSettingStore;
