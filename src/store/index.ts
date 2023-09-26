import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useGroupStore from './modules/group';
import userSubscribeStore from './modules/subscribe';
import useTabBarStore from './modules/tab-bar';

const pinia = createPinia();

export { useAppStore, useUserStore, useTabBarStore, useGroupStore, userSubscribeStore };
export default pinia;
