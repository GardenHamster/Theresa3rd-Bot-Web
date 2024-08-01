import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const Logs: AppRouteRecordRaw = {
  path: '/logs',
  name: 'logs',
  component: DEFAULT_LAYOUT,
  redirect: '/logs/list',
  meta: {
    locale: 'menu.log',
    requiresAuth: true,
    icon: 'icon-info-circle',
    hideChildrenInMenu: true,
    order: 1,
  },
  children: [
    {
      path: 'list',
      name: 'list',
      component: () => import('@/views/log/index.vue'),
      meta: {
        locale: 'menu.log',
        requiresAuth: true,
        activeMenu: 'log',
        roles: ['*'],
      },
    },
  ],
};

export default Logs;
