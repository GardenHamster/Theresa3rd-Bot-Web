import { App } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart, RadarChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent,
} from 'echarts/components';
import Chart from './chart/index.vue';
import Breadcrumb from './breadcrumb/index.vue';
import PreviewTextarea from './form-item/preview-textarea/index.vue';
import PlaceholderTextarea from './form-item/placeholder-textarea/index.vue';
import GroupSelect from './form-item/group-select/index.vue';
import SaveWarning from './form-item/save-warning/index.vue';
import ImageInput from './form-item/image-input/index.vue';
import Clock from './statistic/clock.vue';

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent,
]);

export default {
  install(Vue: App) {
    Vue.component('Chart', Chart);
    Vue.component('Clock', Clock);
    Vue.component('Breadcrumb', Breadcrumb);
    Vue.component('PreviewTextarea', PreviewTextarea);
    Vue.component('PlaceholderTextarea', PlaceholderTextarea);
    Vue.component('GroupSelect', GroupSelect);
    Vue.component('SaveWarning', SaveWarning);
    Vue.component('ImageInput', ImageInput);
  },
};
