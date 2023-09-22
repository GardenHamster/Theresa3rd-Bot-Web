<template>
  <div class="container">
    <a-card class="general-card">
      <Breadcrumb :items="['menu.datas', 'menu.datas.subscribe']" />
      <a-space direction="vertical" size="medium" fill>
        <a-space>
          <a-select :style="{ width: '300px' }" default-value="Beijing" placeholder="Please select ...">
            <a-option>Beijing</a-option>
            <a-option>Shanghai</a-option>
            <a-option>Guangzhou</a-option>
          </a-select>
          <a-button type="primary">退订</a-button>
        </a-space>
        <a-table row-key="name" :columns="columns" :data="dataList" :row-selection="{ type: 'checkbox', showCheckedAll: true, onlyCurrent: false }" v-model:selectedKeys="selectedKeys" :pagination="pagination" />
      </a-space>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { getPixivUserSubscribe } from '@/api/subscribe';
import type { DataType } from '@/api/subscribe';

const selectedKeys = ref([]);
const pagination = { pageSize: 5 };
const { data } = await getPixivUserSubscribe();
console.log('data', data);
const dataList = reactive<DataType[]>(data);

const columns = [
  {
    title: '画师名称',
    dataIndex: 'subscribeName',
  },
  {
    title: '画师Id',
    dataIndex: 'subscribeCode',
  }
];
</script>

<script lang="ts">
export default {
  name: 'SubscribeDatas',
};
</script>

<style scoped lang="less">
.container {
  padding: 20px;
  overflow: hidden;
}
</style>
