import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const Datas: AppRouteRecordRaw = {
  path: '/other',
  name: 'other',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.other',
    requiresAuth: true,
    icon: 'icon-tag',
    order: 6,
  },
  children: [
    {
      path: 'sugar/tag',
      name: 'SugarTag',
      component: () => import('@/views/sugar/tag/index.vue'),
      meta: {
        locale: 'menu.sugar.tag',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'dictionary',
      name: 'Dictionary',
      component: () => import('@/views/dictionary/index.vue'),
      meta: {
        locale: 'menu.dictionary',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default Datas;
