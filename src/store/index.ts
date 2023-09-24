import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useGroupStore from './modules/group';
import useTabBarStore from './modules/tab-bar';


const pinia = createPinia();

export { useAppStore, useUserStore, useTabBarStore, useGroupStore };
export default pinia;
