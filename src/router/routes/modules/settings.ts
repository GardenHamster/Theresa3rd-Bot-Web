import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const Settings: AppRouteRecordRaw = {
  path: '/settings',
  name: 'settings',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.settings',
    requiresAuth: true,
    icon: 'icon-settings',
    order: 1,
  },
  children: [
    {
      path: 'base',
      name: 'BaseSetting',
      component: () => import('@/views/settings/base/index.vue'),
      meta: {
        locale: 'menu.settings.base',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'pixiv',
      name: 'PixivSetting',
      component: () => import('@/views/settings/pixiv/index.vue'),
      meta: {
        locale: 'menu.settings.pixiv',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default Settings;
