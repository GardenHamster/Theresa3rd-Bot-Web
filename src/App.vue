<template>
  <a-config-provider :locale="locale">
    <router-view />
    <global-setting />
  </a-config-provider>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
import GlobalSetting from '@/components/global-setting/index.vue';
import useLocale from '@/hooks/locale';

const { currentLocale } = useLocale();
const locale = computed(() => {
  switch (currentLocale.value) {
    case 'zh-CN':
      return zhCN;
    case 'en-US':
      return enUS;
    default:
      return enUS;
  }
});
</script>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
}

#app {
  height: 100%;
}

.layout-content {
  box-sizing: border-box;
}

.arco-layout .container {
  padding: 20px;
  min-width: 300px;
  overflow: hidden;
  box-sizing: border-box;
}

.arco-layout.mobile .container {
  padding: 0px;
  min-width: 300px;
  overflow: hidden;
  box-sizing: border-box;
}

.arco-layout.mobile .arco-card-body {
  padding: 5px;
}

.arco-textarea-mirror {
  height: 100%;
}

.arco-form-auto-label-width .arco-form-item-label-col>.arco-form-item-label {
  white-space: pre-wrap;
  word-break: break-all;
}

.arco-form-item-label-col {
  min-width: 100px;
  flex-basis: 102px;
  padding-right: 10px;
}

.arco-select-view-tag {
  white-space: nowrap !important;
}
</style>
