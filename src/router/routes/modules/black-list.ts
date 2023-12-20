import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const Datas: AppRouteRecordRaw = {
  path: '/blacklist',
  name: 'blacklist',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.blacklist',
    requiresAuth: true,
    icon: 'icon-stop',
    order: 4,
  },
  children: [
    {
      path: 'member',
      name: 'MemberBlackList',
      component: () => import('@/views/black-list/member/index.vue'),
      meta: {
        locale: 'menu.blacklist.member',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'pixiv/tag',
      name: 'PixivTagBlackList',
      component: () => import('@/views/black-list/pixiv-tag/index.vue'),
      meta: {
        locale: 'menu.blacklist.pixiv.tag',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'pixiv/user',
      name: 'PixivUserBlackList',
      component: () => import('@/views/black-list/pixiv-user/index.vue'),
      meta: {
        locale: 'menu.blacklist.pixiv.user',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default Datas;
