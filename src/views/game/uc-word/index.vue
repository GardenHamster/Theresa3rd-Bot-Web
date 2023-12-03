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
      <Breadcrumb :items="['menu.game', 'menu.game.undercover.words']" />
      <a-space direction="vertical" size="medium" fill>
        <a-space direction="horizontal">
          <a-popconfirm @ok="delWords" content="确定将选中的词组删除吗？" type="warning" position="br">
            <a-button type="primary">删除选中</a-button>
          </a-popconfirm>
          <a-button type="outline" @click="handleAddWord">添加词组</a-button>
          <a-popconfirm @ok="authWords" content="将为选中的内容修改为已审核状态，是否继续？" type="warning" position="br">
            <a-button type="outline">审核词组</a-button>
          </a-popconfirm>
        </a-space>
        <a-table row-key="id" :columns="columnDatas" :data="wordList" :filter-icon-align-left="true" :row-selection="{ type: 'checkbox', showCheckedAll: true, onlyCurrent: true }"
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
    <a-modal v-model:visible="formVisible" title="添加屏蔽标签" @cancel="handleCancel" @before-ok="handleBeforeOk" @ok="handleOk">
      <a-form ref="formRef" layout="horizontal" size="small" :auto-label-width="true" :model="formModel">
        <a-form-item field="word1" label="词条1" :rules="[{ required: true, message: '必须输入一个词条' }]" show-colon feedback>
          <a-input v-model:model-value="formModel.word1" placeholder="输入一个词条" allow-clear />
        </a-form-item>
        <a-form-item field="word2" label="词条2" :rules="[{ required: true, message: '必须输入一个词条' }]" show-colon feedback>
          <a-input v-model:model-value="formModel.word2" placeholder="输入一个词条" allow-clear />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, h } from 'vue';
import useLoading from '@/hooks/loading';
import { IconSearch } from '@arco-design/web-vue/es/icon';
import { getUndercoverWords, addUndercoverWords, } from '@/api/game';
import { authUndercoverWords, deleteUndercoverWords, } from '@/api/game';
import type { UCWordsData, AddUCWordsParam } from '@/api/game';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import { Message } from '@arco-design/web-vue';
import dayjs from 'dayjs';

const formRef = ref();
const formVisible = ref<boolean>(false);
const selectedKeys = ref<number[]>([]);
const pagination = { pageSize: 50 };
const wordList = ref<UCWordsData[]>([]);
const formModel = ref<AddUCWordsParam>({ word1: '', word2: '' });
const { loading, setLoading } = useLoading();

const columns: TableColumnData[] = [
  {
    title: '词条1',
    dataIndex: 'word1',
    ellipsis: true,
    tooltip: true,
    filterable: {
      filter: (value: any, record: any) => record.word1.indexOf(value) > -1,
      slotName: 'code-filter',
      icon: () => h(IconSearch)
    }
  },
  {
    title: '词条2',
    dataIndex: 'word2',
    ellipsis: true,
    tooltip: true,
    filterable: {
      filter: (value: any, record: any) => record.word2.indexOf(value) > -1,
      slotName: 'code-filter',
      icon: () => h(IconSearch)
    }
  },
  {
    title: '已审核',
    dataIndex: 'isAuthorized',
    ellipsis: true,
    tooltip: true,
    render: (record) => record.record.isAuthorized ? '是' : '否',
    sortable: {
      sortDirections: ['ascend', 'descend']
    }
  },
  {
    title: '创建人',
    dataIndex: 'createMember',
    ellipsis: true,
    tooltip: true,
    render: (record) => record.record.createMember === 0 ? '超级管理员' : record.record.createMember,
    sortable: {
      sortDirections: ['ascend', 'descend']
    },
    filterable: {
      filter: (value: any, record: any) => record.createMember !== 0 && record.createMember.toString().indexOf(value) > -1,
      slotName: 'name-filter',
      icon: () => h(IconSearch)
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
    ellipsis: true,
    tooltip: true,
    render: (record) => dayjs.unix(record.record.createAt).format('YYYY-MM-DD HH:mm:ss'),
    sortable: {
      sortDirections: ['ascend', 'descend']
    }
  }
];

const columnDatas = computed(() => {
  if (window.innerWidth < 400) {
    return [columns[0], columns[1], columns[2]]
  }
  return [...columns];
});

const fetchWords = async () => {
  try {
    setLoading(true);
    wordList.value = await getUndercoverWords() as unknown as UCWordsData[];
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const authWords = async () => {
  try {
    setLoading(true);
    const selectedIds = selectedKeys.value;
    if (!selectedIds || selectedIds.length === 0) {
      Message.error({ content: '请至少选择一条记录', position: 'top' });
      return;
    }
    await authUndercoverWords(selectedIds);
    await fetchWords();
    selectedKeys.value.length = 0;
    Message.success({ content: '审核成功', position: 'top' });
  } catch (error) {
    console.log(error);
  }
  finally {
    setLoading(false);
  }
};

const handleOk = async () => {
  try {
    setLoading(true);
    await addUndercoverWords(formModel.value);
    await fetchWords();
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

const delWords = async () => {
  try {
    setLoading(true);
    const selectedIds = selectedKeys.value;
    if (!selectedIds || selectedIds.length === 0) {
      Message.error({ content: '请至少选择一条记录', position: 'top' });
      return;
    }
    await deleteUndercoverWords(selectedIds);
    await fetchWords();
    selectedKeys.value.length = 0;
    Message.success({ content: '删除成功', position: 'top' });
  } catch (error) {
    console.log(error);
  }
  finally {
    setLoading(false);
  }
};

const handleAddWord = async () => {
  formVisible.value = true;
}

const handleCancel = async () => {
  formVisible.value = false;
  formRef.value?.resetFields();
}

const handleBeforeOk = async () => {
  return formRef.value?.validate();
}

fetchWords();
</script>

<script lang="ts">
export default {
  name: 'UndercoverWords',
};
</script>
