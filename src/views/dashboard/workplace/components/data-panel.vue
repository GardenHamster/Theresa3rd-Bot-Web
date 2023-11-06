<template>
  <a-card title="运行统计" :bordered="false">
    <a-grid :cols="24" :row-gap="16" class="panel">
      <a-grid-item :span="mediumSpan">
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img alt="avatar" :src="face05" />
          </a-avatar>
          <clock title="运行时间" :value="runningCount?.runningSeconds" />
        </a-space>
      </a-grid-item>
      <a-grid-item :span="smallSpan">
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img alt="avatar" :src="face06" />
          </a-avatar>
          <a-statistic title="累计处理指令" :value="runningCount?.totalHandle" :value-from="0" animation>
            <template #suffix><span class="unit">次</span></template>
          </a-statistic>
        </a-space>
      </a-grid-item>
    </a-grid>
  </a-card>
  <a-card title="Pixiv推送统计" :bordered="false">
    <a-grid :cols="24" :row-gap="16" class="panel">
      <a-grid-item :span="smallSpan">
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img alt="avatar" :src="face04" />
          </a-avatar>
          <a-statistic title="累计推送作品" :value="runningCount?.totalPixivPush" :value-from="0" animation
            show-group-separator>
            <template #suffix><span class="unit">个</span></template>
          </a-statistic>
        </a-space>
      </a-grid-item>
      <a-grid-item :span="smallSpan">
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img alt="avatar" :src="face04" />
          </a-avatar>
          <a-statistic title="累计扫描作品" :value="runningCount?.totalPixivScan" :value-from="0" animation
            show-group-separator>
            <template #suffix><span class="unit">次</span></template>
          </a-statistic>
        </a-space>
      </a-grid-item>
      <a-grid-item :span="smallSpan">
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img alt="avatar" :src="face07" />
          </a-avatar>
          <a-statistic title="累计扫描错误" :value="runningCount?.totalPixivScanError" :value-from="0" animation
            show-group-separator>
            <template #suffix><span class="unit">次</span></template>
          </a-statistic>
        </a-space>
      </a-grid-item>
    </a-grid>
  </a-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { getRunningCount, RunningCount } from '@/api/count';
import face01 from '@/assets/images/face/199cddd00fab.gif';
import face02 from '@/assets/images/face/4f9557987078.gif';
import face03 from '@/assets/images/face/23e92a6a49cc.gif';
import face04 from '@/assets/images/face/598b75fbd61e.gif';
import face05 from '@/assets/images/face/8857d14bf2e8.gif';
import face06 from '@/assets/images/face/c0c08cd4aaec.gif';
import face07 from '@/assets/images/face/25c77bdb7331.gif';

const runningCount = ref<RunningCount>({ runningSeconds: 0 });
const mediumSpan = { xs: 18, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 };
const smallSpan = { xs: 12, sm: 12, md: 8, lg: 8, xl: 8, xxl: 6 };

const fetchDatas = async () => {
  try {
    runningCount.value = await getRunningCount() as unknown as RunningCount;
    console.log('runningCount', runningCount.value)
  } catch (error) {
    console.log(error);
  }
};

fetchDatas();

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
