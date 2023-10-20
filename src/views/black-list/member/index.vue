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
      <Breadcrumb :items="['menu.subscribe', 'menu.subscribe.pixiv.tag']" />
      <a-space direction="vertical" size="medium" fill>
        <a-space direction="horizontal">
          <a-popconfirm @ok="delMembers" content="确定将选中的成员从黑名单中移除？" type="warning" position="br">
            <a-button type="primary">删除选中</a-button>
          </a-popconfirm>
          <a-button type="primary">添加成员</a-button>
        </a-space>
        <a-table row-key="id" :data="memberList" :columns="columns" :filter-icon-align-left="true"
          :row-selection="{ type: 'checkbox', showCheckedAll: true, onlyCurrent: true }"
          v-model:selectedKeys="selectedKeys" :pagination="pagination" :loading="loading">
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
import { getBanMembers, addBanMember, delBanMember } from '@/api/black-list';
import type { BanMemberData, AddMemberParam } from '@/api/black-list';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import { Message } from '@arco-design/web-vue';

const selectedKeys = ref<number[]>([]);
const pagination = { pageSize: 50 };
const { loading, setLoading } = useLoading();
const memberList = ref<BanMemberData[]>([]);

const columns: TableColumnData[] = [
  {
    title: 'QQ号',
    dataIndex: 'memberId',
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
    title: '添加日期',
    dataIndex: 'createDate',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend']
    }
  }
];

const fetchMembers = async () => {
  try {
    setLoading(true);
    const banMembers = await getBanMembers() as unknown as BanMemberData[];
    memberList.value = banMembers;
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const delMembers = async () => {
  try {
    setLoading(true);
    const selectedIds = selectedKeys.value;
    if (!selectedIds || selectedIds.length === 0) {
      Message.error({ content: '请至少选择一条记录' });
      return;
    }
    await delBanMember(selectedIds);
    selectedKeys.value.length = 0;
    Message.success('退订成功');
  } catch (error) {
    console.log(error);
  }
  finally {
    setLoading(false);
  }
};

fetchMembers();
</script>

<script lang="ts">
export default {
  name: 'MemberBlackList',
};
</script>



