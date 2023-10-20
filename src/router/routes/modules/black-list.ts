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
    order: 2,
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
  ],
};

export default Datas;
