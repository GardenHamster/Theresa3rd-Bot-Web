import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const Datas: AppRouteRecordRaw = {
  path: '/datas',
  name: 'datas',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.datas',
    requiresAuth: true,
    icon: 'icon-storage',
    order: 2,
  },
  children: [
    {
      path: 'subscribe',
      name: 'SubscribeDatas',
      component: () => import('@/views/datas/subscribe/index.vue'),
      meta: {
        locale: 'menu.datas.subscribe',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default Datas;
