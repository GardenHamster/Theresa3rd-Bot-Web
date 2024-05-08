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
      <Breadcrumb :items="['menu.blacklist', 'menu.blacklist.pixiv.tag']" />
      <a-space direction="vertical" size="medium" fill>
        <a-space direction="horizontal">
          <a-popconfirm @ok="delTags" content="确定将选中的成员从黑名单中移除？" type="warning" position="br">
            <a-button type="primary">删除选中</a-button>
          </a-popconfirm>
          <a-button type="outline" @click="handleAddTag">添加标签</a-button>
        </a-space>
        <a-table row-key="id" :data="tagList" :columns="columnDatas" :filter-icon-align-left="true" :row-selection="{ type: 'checkbox', showCheckedAll: true, onlyCurrent: true }"
          v-model:selectedKeys="selectedKeys" :pagination="pagination" :loading="loading" only-current />
      </a-space>
    </a-card>
    <a-modal v-model:visible="formVisible" title="添加屏蔽标签" @cancel="handleCancel" @before-ok="handleBeforeOk" @ok="handleOk">
      <a-form ref="formRef" layout="horizontal" size="small" :auto-label-width="true" :model="formModel">
        <a-form-item field="keyword" label="屏蔽标签" :rules="[{ required: true, message: '必须输入一个标签' }]" show-colon feedback>
          <a-input v-model:model-value="formModel.keyword" placeholder="输入一个标签" allow-clear />
        </a-form-item>
        <a-form-item field="tagMatchType" label="匹配模式" :rules="[{ required: true, message: '必须选择一个模式' }]" show-colon feedback>
          <a-select v-model:model-value="formModel.tagMatchType" :loading="optionLoading" :options="matchOptions" placeholder="选择一个模式">
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import useLoading from '@/hooks/loading';
import { useOptionStore } from '@/store';
import { getBanTags, addBanTag, delBanTag } from '@/api/black-list';
import type { BanTagData, AddTagParam } from '@/api/black-list';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import { Message } from '@arco-design/web-vue';
import { List } from 'linqts';
import dayjs from 'dayjs';

const formRef = ref();
const optionLoading = ref<boolean>(false);
const formVisible = ref<boolean>(false);
const selectedKeys = ref<number[]>([]);
const pagination = { pageSize: 50 };
const optionStore = useOptionStore();
const { loading, setLoading } = useLoading();
const tagList = ref<BanTagData[]>([]);
const formModel = ref<AddTagParam>({ keyword: '', tagMatchType: 0 });
const matchOptions = ref<SelectOptionData[]>([]);

const columns: TableColumnData[] = [
  {
    title: '标签',
    dataIndex: 'keyword',
    ellipsis: true,
    tooltip: true
  },
  {
    title: '全词匹配',
    dataIndex: 'fullMatch',
    ellipsis: true,
    tooltip: true,
    render: (record) => record.record.fullMatch ? '是' : '否'
  },
  {
    title: '正则匹配',
    dataIndex: 'isRegular',
    ellipsis: true,
    tooltip: true,
    render: (record) => record.record.isRegular ? '是' : '否'
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
  if (window.innerWidth < 250) {
    return [columns[0]];
  }
  if (window.innerWidth < 400) {
    return [columns[0], columns[1], columns[2]]
  }
  return [...columns];
});

const handleAddTag = async () => {
  formVisible.value = true;
}

const handleCancel = async () => {
  formVisible.value = false;
  formRef.value?.resetFields();
}

const handleBeforeOk = async () => {
  const result = await formRef.value?.validate();
  if (result) return false;
  const isExists = new List<BanTagData>(tagList.value).Any(o => o?.keyword === formModel.value.keyword);
  if (isExists) {
    formRef.value.setFields({
      keyword: {
        status: 'error',
        message: '该标签已添加'
      }
    });
    return false;
  }
  return true;
}

const fetchTags = async () => {
  try {
    setLoading(true);
    const banTags = await getBanTags() as unknown as BanTagData[];
    tagList.value = banTags;
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const fetchMatchOptions = async () => {
  try {
    optionLoading.value = true;
    matchOptions.value = await optionStore.loadTagMatchOptions();
  } catch (error) {
    console.log(error);
  } finally {
    optionLoading.value = false;
  }
};

const handleOk = async () => {
  try {
    setLoading(true);
    await addBanTag(formModel.value);
    await fetchTags();
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

const delTags = async () => {
  try {
    setLoading(true);
    const selectedIds = selectedKeys.value;
    if (!selectedIds || selectedIds.length === 0) {
      Message.error({ content: '请至少选择一条记录' });
      return;
    }
    await delBanTag(selectedIds);
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
fetchMatchOptions();
</script>

<script lang="ts">
export default {
  name: 'PixivTagBlackList',
};
</script>
