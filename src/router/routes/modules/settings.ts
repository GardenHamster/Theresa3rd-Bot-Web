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
    {
      path: 'menu',
      name: 'MenuSetting',
      component: () => import('@/views/settings/menu/index.vue'),
      meta: {
        locale: 'menu.settings.menu',
        requiresAuth: true,
        roles: ['admin'],
        keepAlive: true,
      },
    },
    {
      path: 'repeater',
      name: 'repeaterSetting',
      component: () => import('@/views/settings/repeater/index.vue'),
      meta: {
        locale: 'menu.settings.repeater',
        requiresAuth: true,
        roles: ['admin'],
        keepAlive: true,
      },
    },
    {
      path: 'welcome',
      name: 'WelcomeSetting',
      component: () => import('@/views/settings/welcome/index.vue'),
      meta: {
        locale: 'menu.settings.welcome',
        requiresAuth: true,
        roles: ['admin'],
        keepAlive: true,
      },
    },
  ],
};

export default Settings;
