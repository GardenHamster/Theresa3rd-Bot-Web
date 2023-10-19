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
      path: 'general',
      name: 'GeneralSetting',
      component: () => import('@/views/settings/general/index.vue'),
      meta: {
        locale: 'menu.settings.general',
        requiresAuth: true,
        roles: ['admin'],
        keepAlive: true,
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
        keepAlive: true,
      },
    },
    {
      path: 'permissions',
      name: 'PermissionsSetting',
      component: () => import('@/views/settings/permissions/index.vue'),
      meta: {
        locale: 'menu.settings.permissions',
        requiresAuth: true,
        roles: ['admin'],
        keepAlive: true,
      },
    },
    {
      path: 'manage',
      name: 'ManageSetting',
      component: () => import('@/views/settings/manage/index.vue'),
      meta: {
        locale: 'menu.settings.manage',
        requiresAuth: true,
        roles: ['admin'],
        keepAlive: true,
      },
    },
  ],
};

export default Settings;
