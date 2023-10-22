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
    order: 3,
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
      path: 'pixivtag',
      name: 'PixivTagBlackList',
      component: () => import('@/views/black-list/pixiv-tag/index.vue'),
      meta: {
        locale: 'menu.blacklist.pixivtag',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default Datas;
