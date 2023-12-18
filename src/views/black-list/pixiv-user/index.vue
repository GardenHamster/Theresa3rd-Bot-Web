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
      <Breadcrumb :items="['menu.blacklist', 'menu.blacklist.pixiv.user']" />
      <a-space direction="vertical" size="medium" fill>
        <a-space direction="horizontal">
          <a-popconfirm @ok="delPixivers" content="确定将选中的画师从黑名单中移除？" type="warning" position="br">
            <a-button type="primary">删除选中</a-button>
          </a-popconfirm>
          <a-button type="outline" @click="handleAddPixiver">添加画师</a-button>
        </a-space>
        <a-table row-key="id" :data="pixiverList" :columns="columnDatas" :filter-icon-align-left="true" :row-selection="{ type: 'checkbox', showCheckedAll: true, onlyCurrent: true }"
          v-model:selectedKeys="selectedKeys" :pagination="pagination" :loading="loading" only-current />
      </a-space>
    </a-card>
    <a-modal v-model:visible="formVisible" title="添加屏蔽画师" @cancel="handleCancel" @before-ok="handleBeforeOk" @ok="handleOk">
      <a-form ref="formRef" layout="horizontal" size="small" :auto-label-width="true" :model="formModel">
        <a-form-item field="pixiverId" label="屏蔽画师" :rules="[{ required: true, message: '必须输入一个画师ID' }]" show-colon feedback>
          <a-input v-model:model-value="formModel.pixiverId" placeholder="输入一个画师ID" allow-clear />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import useLoading from '@/hooks/loading';
import { getBanPixivers, addBanPixiver, delBanPixiver } from '@/api/black-list';
import type { BanPixiverData, AddPixiverParam } from '@/api/black-list';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import { Message } from '@arco-design/web-vue';
import { List } from 'linqts';
import dayjs from 'dayjs';

const formRef = ref();
const formVisible = ref<boolean>(false);
const selectedKeys = ref<number[]>([]);
const pagination = { pageSize: 50 };
const { loading, setLoading } = useLoading();
const pixiverList = ref<BanPixiverData[]>([]);
const formModel = ref<AddPixiverParam>({ pixiverId: '' });

const columns: TableColumnData[] = [
  {
    title: '画师ID',
    dataIndex: 'pixiverId',
    ellipsis: true,
    tooltip: true
  },
  {
    title: '添加日期',
    dataIndex: 'createAt',
    ellipsis: true,
    tooltip: true,
    render: (record) => dayjs.unix(record.record.createAt).format('YYYY-MM-DD HH:mm:ss')
  },
];

const columnDatas = computed(() => {
  return [...columns];
});

const handleAddPixiver = async () => {
  formVisible.value = true;
}

const handleCancel = async () => {
  formVisible.value = false;
  formRef.value?.resetFields();
}

const handleBeforeOk = async () => {
  const result = await formRef.value?.validate();
  if (result) return false;
  const isExists = new List<BanPixiverData>(pixiverList.value).Any(o => o?.pixiverId.toString() === formModel.value.pixiverId);
  if (isExists) {
    formRef.value.setFields({
      keyword: {
        status: 'error',
        message: '该画师已添加'
      }
    });
    return false;
  }
  return true;
}

const fetchPixivers = async () => {
  try {
    setLoading(true);
    pixiverList.value = await getBanPixivers() as unknown as BanPixiverData[];
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const handleOk = async () => {
  try {
    setLoading(true);
    await addBanPixiver(formModel.value);
    await fetchPixivers();
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

const delPixivers = async () => {
  try {
    setLoading(true);
    const selectedIds = selectedKeys.value;
    if (!selectedIds || selectedIds.length === 0) {
      Message.error({ content: '请至少选择一条记录' });
      return;
    }
    await delBanPixiver(selectedIds);
    await fetchPixivers();
    selectedKeys.value.length = 0;
    Message.success('删除成功');
  } catch (error) {
    console.log(error);
  }
  finally {
    setLoading(false);
  }
};

fetchPixivers();
</script>

<script lang="ts">
export default {
  name: 'PixivUserBlackList',
};
</script>



