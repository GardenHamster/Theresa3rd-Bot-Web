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
      <Breadcrumb :items="['menu.other', 'menu.dictionary']" />
      <a-space direction="vertical" size="medium" fill>
        <a-space direction="horizontal">
          <a-popconfirm @ok="handleDel" content="确定要删除选中的内容吗？" type="warning" position="br">
            <a-button type="primary">删除选中</a-button>
          </a-popconfirm>
          <a-button type="outline" @click="handleAddDictionary">添加关键词</a-button>
        </a-space>
        <a-table row-key="id" :data="dictionaryList" :columns="columnDatas" :filter-icon-align-left="true" :row-selection="{ type: 'checkbox', showCheckedAll: true, onlyCurrent: true }"
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
    <a-modal v-model:visible="formVisible" title="添加关键词" @cancel="handleCancel" @before-ok="handleBeforeOk" @ok="handleOk">
      <a-form ref="formRef" layout="horizontal" size="small" :auto-label-width="true" :model="formModel">
        <a-form-item field="words" label="关键词" extra="输入一个关键词后按下Enter添加" required feedback>
          <a-input-tag v-model:model-value="formModel.words" :style="{ minHeight: '100px' }" placeholder="输入键词后按下回车添加" allow-clear />
        </a-form-item>
        <a-form-item field="wordType" label="类型" required feedback>
          <a-select v-model:model-value="formModel.wordType" :options="dictionaryTypeOptions" :loading="optionLoading" @change="onDictionaryTypeChange" placeholder="选择一个类型"></a-select>
        </a-form-item>
        <a-form-item field="subType" label="子类型" required feedback>
          <a-select v-model:model-value="formModel.subType" :options="dictionarySubTypeOptions" :loading="optionLoading" placeholder="选择一个类型"></a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, h } from 'vue';
import { IconSearch } from '@arco-design/web-vue/es/icon';
import useLoading from '@/hooks/loading';
import { useOptionStore } from '@/store';
import { OptionInfo } from '@/store/modules/option/types';
import { infoToOptions, stringToOptions } from '@/utils/options';
import { getDictionary, addDictionary, delDictionary } from '@/api/dictionary';
import type { DictionaryData, AddDictionaryParam } from '@/api/dictionary';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import { Message } from '@arco-design/web-vue';
import { List } from 'linqts';
import dayjs from 'dayjs';

const formRef = ref();
const formVisible = ref<boolean>(false);
const optionLoading = ref<boolean>(false);
const selectedKeys = ref<number[]>([]);
const dictionaryList = ref<DictionaryData[]>([]);
const dictionaryTypeInfos = ref<OptionInfo[]>([]);
const dictionaryTypeOptions = ref<SelectOptionData[]>([]);
const dictionarySubTypeOptions = ref<SelectOptionData[]>([]);
const pagination = { pageSize: 50 };
const optionStore = useOptionStore();
const { loading, setLoading } = useLoading();
const formModel = ref<AddDictionaryParam>({ words: [] });

const onDictionaryTypeChange = () => {
  const subInfos = new List<OptionInfo>(dictionaryTypeInfos.value).Where(o => o?.value === formModel.value.wordType).FirstOrDefault()?.subOptions;
  dictionarySubTypeOptions.value = subInfos === null ? [] : infoToOptions(subInfos);
};

const columns: TableColumnData[] = [
  {
    title: '关键词',
    dataIndex: 'words',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend']
    },
    filterable: {
      filter: (value: any, record: any) => record.words.includes(value),
      slotName: 'code-filter',
      icon: () => h(IconSearch)
    }
  },
  {
    title: '类型',
    dataIndex: 'wordType',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend']
    },
    render: (record) => new List<OptionInfo>(dictionaryTypeInfos.value).Where(o => o?.value === record.record.wordType).FirstOrDefault()?.label ?? '未定义'
  },
  {
    title: '子类型',
    dataIndex: 'subType',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend']
    },
    render: (record) => {
      const options = new List<OptionInfo>(dictionaryTypeInfos.value).Where(o => o?.value === record.record.wordType).FirstOrDefault()?.subOptions;
      if (options === null) return '未定义';
      return new List<OptionInfo>(options).Where(o => o?.value === record.record.subType).FirstOrDefault()?.label ?? '未定义'
    }
  },
  {
    title: '添加日期',
    dataIndex: 'createAt',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend']
    },
    render: (record) => dayjs.unix(record.record.createAt).format('YYYY-MM-DD HH:mm:ss')
  },
];

const columnDatas = computed(() => {
  return [...columns];
});

const handleAddDictionary = async () => {
  formVisible.value = true;
}

const handleCancel = async () => {
  formVisible.value = false;
  formRef.value?.resetFields();
}

const fetchDictionarys = async () => {
  try {
    setLoading(true);
    dictionaryList.value = await getDictionary() as unknown as DictionaryData[];
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const fetchDictionaryTypeOptions = async () => {
  try {
    optionLoading.value = true;
    dictionaryTypeInfos.value = await optionStore.loadDictionaryTypeInfos();
    dictionaryTypeOptions.value = await optionStore.loadDictionaryTypeInfos();
  } catch (error) {
    console.log(error);
  } finally {
    optionLoading.value = false;
  }
};

const handleBeforeOk = async () => {
  return !await formRef.value?.validate();
}

const handleOk = async () => {
  try {
    setLoading(true);
    await addDictionary(formModel.value);
    Message.success({ content: '添加成功', position: 'top' });
    await fetchDictionarys();
    formRef.value?.resetFields();
  } catch (error) {
    console.log(error);
    Message.error({ content: '添加失败', position: 'top' });
  }
  finally {
    setLoading(false);
  }
}

const handleDel = async () => {
  try {
    setLoading(true);
    const selectedIds = selectedKeys.value;
    if (!selectedIds || selectedIds.length === 0) {
      Message.error({ content: '请至少选择一条记录' });
      return;
    }
    await delDictionary(selectedIds);
    await fetchDictionarys();
    selectedKeys.value.length = 0;
    Message.success('删除成功');
  } catch (error) {
    console.log(error);
  }
  finally {
    setLoading(false);
  }
};

fetchDictionarys();
fetchDictionaryTypeOptions();
</script>

<script lang="ts">
export default {
  name: 'Dictionary',
};
</script>
