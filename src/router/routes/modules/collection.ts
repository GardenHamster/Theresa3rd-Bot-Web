import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const Datas: AppRouteRecordRaw = {
  path: '/collection',
  name: 'collection',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.collection',
    requiresAuth: true,
    icon: 'icon-heart',
    order: 7,
  },
  children: [
    {
      path: 'settings',
      name: 'CollectionSettings',
      component: () => import('@/views/collection/settings/index.vue'),
      meta: {
        locale: 'menu.collection.setting',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'settings',
      name: 'CollectionManage',
      component: () => import('@/views/collection/manage/index.vue'),
      meta: {
        locale: 'menu.collection.manage',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default Datas;
