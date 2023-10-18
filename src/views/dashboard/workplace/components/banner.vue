<template>
  <a-col class="banner">
    <a-col :span="24">
      <a-typography-title :heading="5" style="margin-top: 0">
        欢迎使用 TheresaBot
      </a-typography-title>
    </a-col>
    <a-divider :style="{ margin: '15px 0px' }" />
  </a-col>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
.banner {
  width: 100%;
  padding: 20px 20px 0 20px;
  border-radius: 4px 4px 0 0;
}

:deep(.arco-icon-home) {
  margin-right: 6px;
}
</style>
