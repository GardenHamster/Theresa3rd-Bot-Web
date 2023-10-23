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
      <Breadcrumb :items="['menu.blacklist', 'menu.blacklist.member']" />
      <a-space direction="vertical" size="medium" fill>
        <a-space direction="horizontal">
          <a-popconfirm @ok="delMembers" content="确定将选中的成员从黑名单中移除？" type="warning" position="br">
            <a-button type="primary">删除选中</a-button>
          </a-popconfirm>
          <a-button type="outline" @click="handleAddMember">添加成员</a-button>
        </a-space>
        <a-table row-key="id" :data="memberList" :columns="columns" :filter-icon-align-left="true"
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
    <a-modal v-model:visible="formVisible" title="添加黑名单成员" @cancel="handleCancel" @before-ok="handleBeforeOk"
      @ok="handleOk">
      <a-form ref="formRef" layout="horizontal" size="small" :auto-label-width="true" :model="formModel">
        <a-form-item field="memberId" label="屏蔽QQ"
          :rules="[{ required: true, message: '必须输入一个qq号' }, { type: 'number', positive: true, message: '必须输入一个正数' }]"
          show-colon feedback>
          <a-input v-model:model-value="formModel.memberId" placeholder="输入一个QQ号" allow-clear />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useLoading from '@/hooks/loading';
import { getBanMembers, addBanMember, delBanMember } from '@/api/black-list';
import type { BanMemberData, AddMemberParam } from '@/api/black-list';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import { Message } from '@arco-design/web-vue';
import { List } from 'linqts';
import dayjs from 'dayjs';

const formRef = ref();
const formVisible = ref<boolean>(false);
const selectedKeys = ref<number[]>([]);
const pagination = { pageSize: 50 };
const { loading, setLoading } = useLoading();
const memberList = ref<BanMemberData[]>([]);
const formModel = ref<AddMemberParam>({ memberId: '' });

const columns: TableColumnData[] = [
  {
    title: '屏蔽QQ',
    dataIndex: 'memberId',
    ellipsis: true,
    tooltip: true
  },
  {
    title: '添加日期',
    dataIndex: 'createAt',
    ellipsis: true,
    tooltip: true,
    render: (record) => dayjs.unix(record.record.createAt).format('YYYY-MM-DD HH:mm:ss')
  }
];
const handleAddMember = async () => {
  formVisible.value = true;
}

const handleCancel = async () => {
  formVisible.value = false;
  formRef.value?.resetFields();
}

const handleBeforeOk = async () => {
  const result = await formRef.value?.validate();
  if (result) return false;
  const isExists = new List<BanMemberData>(memberList.value).Any(o => o?.memberId.toString() === formModel.value.memberId);
  if (isExists) {
    formRef.value.setFields({
      memberId: {
        status: 'error',
        message: '该成员已添加'
      }
    });
    return false;
  }
  return true;
}

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

const handleOk = async () => {
  try {
    setLoading(true);
    await addBanMember(formModel.value);
    await fetchMembers();
    Message.success({ content: '添加成功', position: 'top' });
    formRef.value?.resetFields();
  } catch (error) {
    console.log(error);
    Message.error({ content: '添加失败', position: 'top' });
  }
  finally {
    setLoading(false);
  }
}

const delMembers = async () => {
  try {
    setLoading(true);
    const selectedIds = selectedKeys.value;
    if (!selectedIds || selectedIds.length === 0) {
      Message.error({ content: '请至少选择一条记录' });
      return;
    }
    await delBanMember(selectedIds);
    await fetchMembers();
    selectedKeys.value.length = 0;
    Message.success('删除成功');
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



