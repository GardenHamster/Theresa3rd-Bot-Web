import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const Datas: AppRouteRecordRaw = {
  path: '/game',
  name: 'game',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.game',
    requiresAuth: true,
    icon: 'icon-trophy',
    order: 5,
  },
  children: [
    {
      path: 'setting',
      name: 'GameSetting',
      component: () => import('@/views/game/setting/index.vue'),
      meta: {
        locale: 'menu.game.setting',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'undercover/words',
      name: 'UndercoverWords',
      component: () => import('@/views/game/uc-word/index.vue'),
      meta: {
        locale: 'menu.game.undercover.words',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default Datas;
