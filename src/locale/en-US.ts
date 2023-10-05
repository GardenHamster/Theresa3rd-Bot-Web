import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';
import localeWorkplace from '@/views/dashboard/workplace/locale/en-US';
import localeSettings from './en-US/settings';

export default {
  'menu.dashboard': 'Dashboard',
  'menu.settings': 'Bot Settings',
  'menu.settings.general': 'General Settings',
  'menu.settings.pixiv': 'Pixiv Settings',
  'menu.subscribe': 'Subscription Management',
  'menu.subscribe.pixiv.user': 'Pixiv User Subscription',
  'menu.subscribe.pixiv.tag': 'Pixiv Tag Subscription',
  'menu.subscribe.miyoushe.user': 'Miyoushe User Subscription',
  'menu.botWebsite': 'Bot Docs',
  'menu.server.dashboard': 'Dashboard-Server',
  'menu.server.workplace': 'Workplace-Server',
  'menu.server.monitor': 'Monitor-Server',
  'menu.list': 'List',
  'menu.result': 'Result',
  'menu.exception': 'Exception',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.user': 'User Center',
  'menu.faq': 'FAQ',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
  'button.submit': 'Save',
  'button.reset': 'Reset',
  'button.restore': 'Restore',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
};
