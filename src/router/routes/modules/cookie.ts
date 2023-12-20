import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const Datas: AppRouteRecordRaw = {
  path: '/cookie',
  name: 'cookie',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.cookie',
    requiresAuth: true,
    icon: 'icon-copyright',
    order: 3,
  },
  children: [
    {
      path: 'pixiv',
      name: 'PixivCookie',
      component: () => import('@/views/cookie/pixiv/index.vue'),
      meta: {
        locale: 'menu.cookie.pixiv',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'saucenao',
      name: 'SaucenaoCookie',
      component: () => import('@/views/cookie/saucenao/index.vue'),
      meta: {
        locale: 'menu.cookie.saucenao',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default Datas;
