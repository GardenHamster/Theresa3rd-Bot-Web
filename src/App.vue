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
.arco-textarea-mirror {
  height: 100%;
}

.arco-form-auto-label-width .arco-form-item-label-col>.arco-form-item-label {
  white-space: pre-line;
}

.arco-form-item-label-col>.arco-form-item-label {
  max-width: 150px;
}

.arco-form-item-label-col {
  padding-right: 10px;
}
</style>
