import { createApp } from 'vue';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import globalComponents from '@/components';
import router from './router';
import store from './store';
import i18n from './locale';
import directive from './directive';
import './mock';
import App from './App.vue';
import '@arco-themes/vue-mengtu/theme.less';
import '@/api/interceptor';

declare global {
  interface Window {
    baseURL: string;
  }
}
window.baseURL = import.meta.env.VITE_API_BASE_URL;

const app = createApp(App);
app.use(ArcoVue, {});
app.use(ArcoVueIcon);
app.use(router);
app.use(store);
app.use(i18n);
app.use(globalComponents);
app.use(directive);
app.mount('#app');
