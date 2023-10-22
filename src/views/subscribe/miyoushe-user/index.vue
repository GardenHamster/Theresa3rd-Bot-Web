<style scoped lang="less">
.custom-filter {
  padding: 20px;
  background: var(--color-bg-5);
  border: 1px solid var(--color-neutral-3);
  border-radius: var(--border-radius-medium);
  box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
}

.custom-filter-footer {
  display: flex;
  justify-content: space-between;
}
</style>

<template>
  <div class="container">
    <a-card class="card">
      <Breadcrumb :items="['menu.subscribe', 'menu.subscribe.miyoushe.user']" />
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
        <a-table row-key="id" :columns="columnDatas" :data="subscribeList" :filter-icon-align-left="true"
          :row-selection="{ type: 'checkbox', showCheckedAll: true, onlyCurrent: true }"
          v-model:selectedKeys="selectedKeys" :pagination="pagination" :loading="loading" only-current>
          <template #code-filter="{ filterValue, setFilterValue, handleFilterConfirm, handleFilterReset }">
            <div class="custom-filter">
              <a-space direction="vertical">
                <a-input :model-value="filterValue[0]" @input="(value) => setFilterValue([value])" />
                <div class="custom-filter-footer">
                  <a-button @click="handleFilterConfirm">搜索</a-button>
                  <a-button @click="handleFilterReset">重置</a-button>
                </div>
              </a-space>
            </div>
          </template>
          <template #name-filter="{ filterValue, setFilterValue, handleFilterConfirm, handleFilterReset }">
            <div class="custom-filter">
              <a-space direction="vertical">
                <a-input :model-value="filterValue[0]" @input="(value) => setFilterValue([value])" />
                <div class="custom-filter-footer">
                  <a-button @click="handleFilterConfirm">搜索</a-button>
                  <a-button @click="handleFilterReset">重置</a-button>
                </div>
              </a-space>
            </div>
          </template>
        </a-table>
      </a-space>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, h } from 'vue';
import { IconSearch } from '@arco-design/web-vue/es/icon';
import useLoading from '@/hooks/loading';
import { useGroupStore } from '@/store';
import { getMiyousheUserSubscribe, deleteSubscribe } from '@/api/subscribe';
import { GroupInfo } from '@/store/modules/group/types';
import type { SubscribeData } from '@/api/subscribe';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
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

const columns: TableColumnData[] = [
  {
    title: '版主ID',
    dataIndex: 'subscribeCode',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend']
    },
    filterable: {
      filter: (value: any, record: any) => record.subscribeCode.includes(value),
      slotName: 'code-filter',
      icon: () => h(IconSearch)
    }
  },
  {
    title: '版主名称',
    dataIndex: 'subscribeName',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend']
    },
    filterable: {
      filter: (value: any, record: any) => record.subscribeName.includes(value),
      slotName: 'name-filter',
      icon: () => h(IconSearch)
    }
  },
  {
    title: '目标群',
    dataIndex: 'subscribeGroup',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend']
    },
  },
  {
    title: '订阅日期',
    dataIndex: 'subscribeDate',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend']
    }
  }
];

const columnDatas = computed(() => {
  if (window.innerWidth < 250) {
    return [columns[1]];
  }
  if (window.innerWidth < 400) {
    return [columns[1], columns[2]]
  }
  if (window.innerWidth < 550) {
    return [columns[0], columns[1], columns[2]]
  }
  return [...columns];
});

const fetchSubscribes = async (groupId = 0) => {
  try {
    setLoading(true);
    const groupInfos = await groupStore.loadGroupInfos();
    const subscribeDatas = await getMiyousheUserSubscribe() as unknown as SubscribeData[];
    for (let index = 0; index < subscribeDatas.length; index += 1) {
      const data = subscribeDatas[index];
      const groupName = new List<GroupInfo>(groupInfos).Where((o) => o?.groupId === data.groupId).FirstOrDefault()?.groupName ?? data.groupId;
      data.subscribeGroup = data.groupId === 0 ? '订阅可用群' : `${groupName}(${data.groupId})`;
    }
    subscribeList.value = groupId === 0 ? subscribeDatas : new List<SubscribeData>(subscribeDatas).Where(o => o?.groupId === groupId).ToArray();
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const fetchGroups = async () => {
  try {
    groupLoading = true;
    groupOptions.value = await groupStore.loadGroupOptions();
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
      Message.error({ content: '请至少选择一条记录' });
      return;
    }
    await deleteSubscribe(selectedIds);
    subscribeList.value = new List<SubscribeData>(subscribeList.value).Where(o => !selectedIds.includes(o!.id)).ToArray();
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
  name: 'MiyousheUserSubscribe',
};
</script>
