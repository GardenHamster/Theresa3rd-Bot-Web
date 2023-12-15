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
      <Breadcrumb :items="['menu.other', 'menu.sugar.tag']" />
      <a-space direction="vertical" size="medium" fill>
        <a-space direction="horizontal">
          <a-popconfirm @ok="delSugars" content="确定要删除选中的项目吗？" type="warning" position="br">
            <a-button type="primary">删除选中</a-button>
          </a-popconfirm>
          <a-button type="outline" @click="handleAddSugar">添加绑定</a-button>
        </a-space>
        <a-table row-key="id" :data="sugarList" :columns="columnDatas" :filter-icon-align-left="true" :row-selection="{ type: 'checkbox', showCheckedAll: true, onlyCurrent: true }"
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
    <a-modal v-model:visible="formVisible" title="添加标签绑定" @cancel="handleCancel" @ok="handleOk">
      <a-form ref="formRef" layout="horizontal" size="small" :auto-label-width="true" :model="formModel">
        <a-form-item field="keyword" label="关键词" :rules="[{ required: true, message: '至少输入一个关键词' }]" show-colon feedback>
          <a-textarea v-model:model-value="formModel.keyword" placeholder="输入被搜索的关键词，多个关键词之间用逗号隔开" allow-clear />
        </a-form-item>
        <a-form-item field="bindTags" label="绑定标签" :rules="[{ required: true, message: '必须输入标签' }]" show-colon feedback>
          <a-textarea v-model:model-value="formModel.bindTags" placeholder="输入与关键词绑定的Pixiv标签，多个标签之间用逗号隔开" allow-clear />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, h } from 'vue';
import { IconSearch } from '@arco-design/web-vue/es/icon';
import useLoading from '@/hooks/loading';
import { getSugarTags, addSugarTag, delSugarTag } from '@/api/sugar';
import type { SugarTagData, AddSugarTagParam } from '@/api/sugar';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import { Message } from '@arco-design/web-vue';

const formRef = ref();
const formVisible = ref<boolean>(false);
const selectedKeys = ref<number[]>([]);
const sugarList = ref<SugarTagData[]>([]);
const pagination = { pageSize: 50 };
const { loading, setLoading } = useLoading();
const formModel = ref<AddSugarTagParam>({ keyword: '', bindTags: '' });

const columns: TableColumnData[] = [
  {
    title: '关键词',
    dataIndex: 'keyword',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend']
    },
    filterable: {
      filter: (value: any, record: any) => record.keyword.includes(value),
      slotName: 'code-filter',
      icon: () => h(IconSearch)
    }
  },
  {
    title: '绑定标签',
    dataIndex: 'bindTags',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend']
    },
    filterable: {
      filter: (value: any, record: any) => record.bindTags.includes(value),
      slotName: 'code-filter',
      icon: () => h(IconSearch)
    }
  }
];

const columnDatas = computed(() => {
  return [...columns];
});

const handleAddSugar = async () => {
  formVisible.value = true;
}

const handleCancel = async () => {
  formVisible.value = false;
  formRef.value?.resetFields();
}

const fetchTags = async () => {
  try {
    setLoading(true);
    sugarList.value = await getSugarTags() as unknown as SugarTagData[];
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};


const handleOk = async () => {
  try {
    setLoading(true);
    await addSugarTag(formModel.value);
    Message.success({ content: '添加成功', position: 'top' });
    await fetchTags();
    formRef.value?.resetFields();
  } catch (error) {
    console.log(error);
    Message.error({ content: '添加失败', position: 'top' });
  }
  finally {
    setLoading(false);
  }
}

const delSugars = async () => {
  try {
    setLoading(true);
    const selectedIds = selectedKeys.value;
    if (!selectedIds || selectedIds.length === 0) {
      Message.error({ content: '请至少选择一条记录' });
      return;
    }
    await delSugarTag(selectedIds);
    await fetchTags();
    selectedKeys.value.length = 0;
    Message.success('删除成功');
  } catch (error) {
    console.log(error);
  }
  finally {
    setLoading(false);
  }
};

fetchTags();
</script>

<script lang="ts">
export default {
  name: 'SugarTag',
};
</script>



