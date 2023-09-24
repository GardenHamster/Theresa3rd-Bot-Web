<template>
  <div class="container">
    <a-card class="general-card">
      <Breadcrumb :items="['menu.datas', 'menu.datas.subscribe']" />
      <a-space direction="vertical" size="medium" fill>
        <a-space direction="horizontal">
          <a-select @change="groupChange" v-model="selectedGroup" :options="groupOptions" :style="{ minWidth: '200px' }"
            default-value="0" placeholder="Please select ...">
          </a-select>
          <a-button type="primary">退订选中</a-button>
        </a-space>
        <a-table row-key="subscribeId" :columns="columns" :data="subscribeList"
          :row-selection="{ type: 'checkbox', showCheckedAll: true, onlyCurrent: false }"
          v-model:selectedKeys="selectedKeys" :pagination="pagination" />
      </a-space>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useLoading from '@/hooks/loading';
import { useGroupStore } from '@/store';
import { getPixivUserSubscribe } from '@/api/subscribe';
import type { PixivUserSubscribe } from '@/api/subscribe';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import { List } from 'linqts';

const selectedKeys = ref([]);
const selectedGroup = ref(0);
const pagination = { pageSize: 25 };
const groupStore = useGroupStore();
const { groupOptions } = groupStore;
const { loading, setLoading } = useLoading(true);
const subscribeList = ref<PixivUserSubscribe[]>([]);
const groupList = ref<SelectOptionData[]>([]);

const fetchData = async (groupId = 0) => {
  try {
    setLoading(true);
    const data = await getPixivUserSubscribe() as unknown as PixivUserSubscribe[];
    subscribeList.value = groupId === 0 ? data : new List<PixivUserSubscribe>(data).Where(o => o?.groupId === groupId).ToArray();
    await groupStore.load();
    groupList.value = groupStore.groupOptions as [];
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

const groupChange = async () => {
  await fetchData(selectedGroup.value);
};

const columns = [
  {
    title: '画师Id',
    dataIndex: 'subscribeCode',
  },
  {
    title: '画师名称',
    dataIndex: 'subscribeName',
  },
];

fetchData();

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
