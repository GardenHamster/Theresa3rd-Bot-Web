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
    {
      path: 'pixiv/tag',
      name: 'PixivTagSubscribe',
      component: () => import('@/views/subscribe/pixiv-tag/index.vue'),
      meta: {
        locale: 'menu.subscribe.pixiv.tag',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'miyoushe/user',
      name: 'MiyousheUserSubscribe',
      component: () => import('@/views/subscribe/miyoushe-user/index.vue'),
      meta: {
        locale: 'menu.subscribe.miyoushe.user',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default Datas;
