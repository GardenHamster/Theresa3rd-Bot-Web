<template>
  <a-spin class="spin" :loading="loading" tip="加载中..." :size="35">
    <div class="container">
      <div class="left-side">
        <div class="panel background">
          <div class="mask">
            <Banner />
            <DataPanel :totalCount="totalCount" :subscribeCount="subscribeCount" />
            <Instructions />
            <div style="height:30px;"></div>
          </div>
        </div>
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { RunningCount, SubscribeCount } from '@/api/count';
import { getSingleCount, getTotalCount, getSubscribeCount } from '@/api/count';
import useLoading from '@/hooks/loading';
import Instructions from './components/instructions.vue';
import Banner from './components/banner.vue';
import DataPanel from './components/data-panel.vue';

const { loading, setLoading } = useLoading();
const totalCount = ref<RunningCount>({ runningSeconds: 0 });
const subscribeCount = ref<SubscribeCount>({});

const fetchDatas = async () => {
  try {
    setLoading(true);
    totalCount.value = await getTotalCount() as unknown as RunningCount;
    subscribeCount.value = await getSubscribeCount() as unknown as SubscribeCount;
  } catch (error) {
    console.log(error);
  }
  finally {
    setLoading(false);
  }
};

fetchDatas();
</script>

<script lang = "ts" >
export default {
  name: 'Workplace',
};
</script>

<style lang="less" scoped>
.spin {
  height: 100%;
  width: 100%;
}

.container {
  height: 100%;
  padding: 15px 20px 5px 20px;
  display: flex;
  border-radius: 5px;
}

.left-side {
  flex: 1;
  overflow: auto;
  background-color: var(--color-bg-2);
  height: 100%;
}

.right-side {
  width: 280px;
  margin-left: 16px;
}

.panel {
  border-radius: 4px;
  overflow: auto;
}

.background {
  height: 100%;
  overflow: auto;
  background: url('../../../assets/images/background/112539581_p0.jpg') 80% 15% / cover;
}

.mask {
  height: 100%;
  overflow: auto;
  background-color: #fff;
  opacity: .85;
  z-index: 1;
}

:deep(.panel-border) {
  margin-bottom: 0;
  border-bottom: 1px solid rgb(var(--gray-2));
}

.moduler-wrap {
  border-radius: 4px;
  background-color: var(--color-bg-2);

  :deep(.text) {
    font-size: 12px;
    text-align: center;
    color: rgb(var(--gray-8));
  }

  :deep(.wrapper) {
    margin-bottom: 8px;
    text-align: center;
    cursor: pointer;

    &:last-child {
      .text {
        margin-bottom: 0;
      }
    }

    &:hover {
      .icon {
        color: rgb(var(--arcoblue-6));
        background-color: #e8f3ff;
      }

      .text {
        color: rgb(var(--arcoblue-6));
      }
    }
  }

  :deep(.icon) {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-bottom: 4px;
    color: rgb(var(--dark-gray-1));
    line-height: 32px;
    font-size: 16px;
    text-align: center;
    background-color: rgb(var(--gray-1));
    border-radius: 4px;
  }
}
</style>

<style lang="less" scoped>
// responsive
.mobile {
  .container {
    display: block;
  }

  .right-side {
    // display: none;
    width: 100%;
    margin-left: 0;
    margin-top: 16px;
  }
}
</style>
