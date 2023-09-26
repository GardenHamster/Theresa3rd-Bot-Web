import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const Datas: AppRouteRecordRaw = {
  path: '/subscribe',
  name: 'subscribe',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.subscribe',
    requiresAuth: true,
    icon: 'icon-storage',
    order: 2,
  },
  children: [
    {
      path: 'pixiv/user',
      name: 'PixivUserSubscribe',
      component: () => import('@/views/subscribe/pixiv-user/index.vue'),
      meta: {
        locale: 'menu.subscribe.pixiv.user',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default Datas;
