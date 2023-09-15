<template>
  <div class="container">
    <a-card class="general-card">
      <Breadcrumb :items="['menu.datas', 'menu.datas.subscribe']" />
      <a-space direction="vertical" size="large" fill>
        <a-table row-key="name" :columns="columns" :data="data" :row-selection="{ type: 'checkbox', showCheckedAll: true, onlyCurrent: false }" v-model:selectedKeys="selectedKeys" :pagination="pagination" />
      </a-space>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';

const selectedKeys = ref(['Jane Doe', 'Alisa Ross']);

const pagination = { pageSize: 5 };

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

const data = reactive([{
  key: '1',
  name: 'Jane Doe',
  salary: 23000,
  address: '32 Park Road, London',
  email: 'jane.doe@example.com'
}, {
  key: '2',
  name: 'Alisa Ross',
  salary: 25000,
  address: '35 Park Road, London',
  email: 'alisa.ross@example.com'
}, {
  key: '3',
  name: 'Kevin Sandra',
  salary: 22000,
  address: '31 Park Road, London',
  email: 'kevin.sandra@example.com',
  disabled: true
}, {
  key: '4',
  name: 'Ed Hellen',
  salary: 17000,
  address: '42 Park Road, London',
  email: 'ed.hellen@example.com'
}, {
  key: '5',
  name: 'William Smith',
  salary: 27000,
  address: '62 Park Road, London',
  email: 'william.smith@example.com'
}, {
  key: '6',
  name: 'Jane Doe 2',
  salary: 15000,
  address: '32 Park Road, London',
  email: 'jane.doe@example.com'
}, {
  key: '7',
  name: 'Alisa Ross 2',
  salary: 28000,
  address: '35 Park Road, London',
  email: 'alisa.ross@example.com'
}, {
  key: '8',
  name: 'Kevin Sandra 2',
  salary: 26000,
  address: '31 Park Road, London',
  email: 'kevin.sandra@example.com',
}, {
  key: '9',
  name: 'Ed Hellen 2',
  salary: 18000,
  address: '42 Park Road, London',
  email: 'ed.hellen@example.com'
}, {
  key: '10',
  name: 'William Smith 2',
  salary: 12000,
  address: '62 Park Road, London',
  email: 'william.smith@example.com'
}]);
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
