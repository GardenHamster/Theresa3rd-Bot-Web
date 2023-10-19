<template>
  <a-grid :cols="24" :row-gap="16" class="panel">
    <a-grid-item :span="gridSpan">
      <a-space>
        <a-avatar :size="54" class="col-avatar">
          <img alt="avatar" :src="face05" />
        </a-avatar>
        <clock title="运行时间" :value="runTime"/>
      </a-space>
    </a-grid-item>

     <a-grid-item :span="gridSpan">
      <a-space>
        <a-avatar :size="54" class="col-avatar">
          <img alt="avatar" :src="face06" />
        </a-avatar>
        <a-statistic
          title="累计处理指令"
          :value="114514"
          :value-from="0"
          animation>
          <template #suffix><span class="unit">次</span></template>
        </a-statistic>
      </a-space>
    </a-grid-item>
    
    <a-grid-item :span="gridSpan">
      <a-space>
        <a-avatar :size="54" class="col-avatar">
          <img alt="avatar" :src="face04" />
        </a-avatar>
        <a-statistic
          title="累计扫描作品"
          :value="368"
          :value-from="0"
          animation
          show-group-separator>
          <template #suffix><span class="unit">次</span></template>
        </a-statistic>
      </a-space>
    </a-grid-item>

    <a-grid-item :span="gridSpan">
      <a-space>
        <a-avatar :size="54" class="col-avatar">
          <img alt="avatar" :src="face07" />
        </a-avatar>
        <a-statistic
          title="扫描错误次数"
          :value="1"
          :value-from="0"
          animation
          show-group-separator>
          <template #suffix><span class="unit">次</span></template>
        </a-statistic>
      </a-space>
    </a-grid-item>

    <a-grid-item :span="24">
      <a-divider class="panel-border" />
    </a-grid-item>
  </a-grid>
</template>

<script lang="ts" setup>
import face01 from '@/assets/images/face/199cddd00fab.gif';
import face02 from '@/assets/images/face/4f9557987078.gif';
import face03 from '@/assets/images/face/23e92a6a49cc.gif';
import face04 from '@/assets/images/face/598b75fbd61e.gif';
import face05 from '@/assets/images/face/8857d14bf2e8.gif';
import face06 from '@/assets/images/face/c0c08cd4aaec.gif';
import face07 from '@/assets/images/face/25c77bdb7331.gif';
import { computed, ref } from 'vue';

const gridSpan = { xs: 12, sm: 12, md: 8, lg: 8, xl: 8, xxl: 6 };
const runTime = ref<number>(86400);
</script>

<style lang="less" scoped>
.arco-grid.panel {
  margin-bottom: 0;
  padding: 16px 20px 0 20px;
  overflow-x: hidden;
  overflow-y: auto;
  font-weight: bold;
}

.arco-layout.mobile .arco-grid.panel {
  margin-bottom: 0;
  padding: 16px 5px 0 5px;
}

.col-avatar {
  margin-right: 12px;
}

.up-icon {
  color: rgb(var(--red-6));
}

.unit {
  margin-left: 8px;
  color: rgb(var(--gray-8));
  font-size: 12px;
}

:deep(.panel-border) {
  margin: 4px 0 0 0;
}
</style>
