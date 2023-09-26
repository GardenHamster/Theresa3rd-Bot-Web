<template>
  <div class="container">
    <a-card class="general-card">
      <Breadcrumb :items="['menu.datas', 'menu.datas.subscribe']" />
      <a-space direction="vertical" size="medium" fill>
        <a-space direction="horizontal">
          <a-select @change="groupChange" v-model.number="selectedGroup" :options="groupOptions"
            :style="{ minWidth: '200px' }" placeholder="Please select ..." :loading="groupLoading" allow-search>
            <a-option :value="0">全部</a-option>
          </a-select>
          <a-popconfirm @ok="unsubscribe" content="将为所有群退订被选中的订阅，是否继续？" type="warning" position="br">
            <a-button type="primary">退订选中</a-button>
          </a-popconfirm>
        </a-space>
        <a-table row-key="subscribeId" :columns="columns" :data="subscribeList"
          :row-selection="{ type: 'checkbox', showCheckedAll: true, onlyCurrent: false }"
          v-model:selectedKeys="selectedKeys" :pagination="pagination" :loading="loading" />
      </a-space>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useLoading from '@/hooks/loading';
import { useGroupStore } from '@/store';
import { getPixivUserSubscribe, cancleSubscribe } from '@/api/subscribe';
import type { SubscribeData } from '@/api/subscribe';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import { Message } from '@arco-design/web-vue';
import { List } from 'linqts';

let groupLoading = false;
const selectedKeys = ref<number[]>([]);
const selectedGroup = ref<number>(0);
const pagination = { pageSize: 50 };
const groupStore = useGroupStore();
const { loading, setLoading } = useLoading();
const subscribeList = ref<SubscribeData[]>([]);
const groupOptions = ref<SelectOptionData[]>([]);

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

const fetchSubscribes = async (groupId = 0) => {
  try {
    setLoading(true);
    const data = await getPixivUserSubscribe() as unknown as SubscribeData[];
    subscribeList.value = groupId === 0 ? data : new List<SubscribeData>(data).Where(o => o?.groupId === groupId).ToArray();
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const fetchGroups = async () => {
  try {
    groupLoading = true;
    await groupStore.load();
    groupOptions.value = groupStore.groupOptions as SelectOptionData[];
  } catch (error) {
    console.log(error);
  } finally {
    groupLoading = false;
  }
};

const groupChange = async () => {
  try {
    await fetchSubscribes(selectedGroup.value);
  } catch (error) {
    console.log(error);
  }
};

const unsubscribe = async () => {
  try {
    setLoading(true);
    const selectedIds = selectedKeys.value;
    if (!selectedIds || selectedIds.length === 0) {
      Message.error({ content: '请至少选择一个项目' });
      return;
    }
    await cancleSubscribe(selectedIds);
    subscribeList.value = new List<SubscribeData>(subscribeList.value).Where(o => !selectedIds.includes(o!.subscribeId)).ToArray();
    selectedKeys.value.length = 0;
    Message.success('退订成功');
  } catch (error) {
    console.log(error);
  }
  finally {
    setLoading(false);
  }
};

fetchSubscribes();
fetchGroups();

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
