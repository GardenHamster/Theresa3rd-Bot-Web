import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useGroupStore from './modules/group';
import usePathStore from './modules/path';
import useSettingStore from './modules/setting';
import useTabBarStore from './modules/tab-bar';

const pinia = createPinia();

export { useAppStore, useUserStore, useTabBarStore, useGroupStore, usePathStore, useSettingStore };
export default pinia;
