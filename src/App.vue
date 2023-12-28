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
html,
body,
#app {
  height: 100%;
}

.layout-content {
  box-sizing: border-box;
}

.arco-layout .container {
  padding: 20px 20px 20px 20px;
  min-width: 300px;
  overflow: hidden;
  box-sizing: border-box;
}

.arco-layout.mobile .container {
  padding: 0px;
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
  flex-basis: 105px;
  padding-right: 10px;
}

.arco-modal .arco-form-item-label-col {
  min-width: 80px;
}

.mobile .arco-modal-body {
  padding: 24px 5px;
}

.arco-select-view-tag {
  white-space: nowrap !important;
}

.arco-modal {
  min-width: 300px;
  max-width: 50%;
}

.arco-textarea {
  resize: none;
}

.arco-textarea::-webkit-scrollbar-track-piece {
  background-color: #f8f8f8;
}

.arco-textarea::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.arco-textarea::-webkit-scrollbar-thumb {
  background-color: #dddddd;
  background-clip: padding-box;
  -webkit-border-radius: 2.5em;
  border-radius: 2.5em;
  min-height: 35px;
}

.arco-textarea::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}
</style>
