<style scoped lang="less">
.spin {
  height: 100%;
  width: 100%;
}

.container {
  height: 100%;
  margin-bottom: 50px;
  overflow: auto;
}

.card {
  margin-bottom: 5px;
  position: relative;
  overflow: visible;
}

.actions {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 30px 10px 0;
  background: var(--color-bg-2);
  text-align: right;
}

.addCard {
  border: 1px dashed rgb(var(--primary-6));
  text-align: center;
  cursor: pointer;
}

.addTemp {
  font-size: 16px;
  color: rgb(var(--primary-6));
}

.delCard {
  cursor: pointer;
  padding: 10px;
}
</style>

<template>
  <a-spin class="spin" :loading="loading" tip="加载中..." :size="35">
    <div class="container">
      <a-form ref="formRef" layout="horizontal" size="large" :auto-label-width="true" :scroll-to-first-error="true" :model="formModel">
        <a-card class="card">
          <save-warning :initModel="initModel" :formModel="formModel" />
          <Breadcrumb :items="['menu.settings', 'menu.settings.welcome']" />

          <a-form-item field="enable" label="启用功能" tooltip="是否启用该功能" feedback>
            <a-switch v-model:model-value="formModel.enable">
              <template #checked>ON</template>
              <template #unchecked>OFF</template>
            </a-switch>
          </a-form-item>
          <a-form-item field="template" label="默认模版" tooltip="自定义欢迎模版" extra="输入“[”可以快速插入图片码" :disabled="!formModel.enable" :rules="[{ required: true, message: '必须输入内容' }]" feedback>
            <preview-textarea v-model:model-value="formModel.template" :facePaths="facePaths" />
          </a-form-item>
        </a-card>

        <a-card class="card" v-for="(item, index) of formModel.specials" :key="index" :title="`模板${padLeft((index + 1).toString(), (0).toString(), 2)}`">
          <template #extra>
            <a-popconfirm @ok="onDeleteCard(index)" content="确定要删除这个模版吗？" type="warning" position="br">
              <span class="delCard">删除</span>
            </a-popconfirm>
          </template>
          <a-form-item :field="`specials[${index}].groups`" label="指定群" tooltip="指定使用该模版的群" :disabled="!formModel.enable" :rules="[{ required: true, message: '至少选择一个群' }]" feedback>
            <group-select v-model:model-value="item.groups" :options="groupOptions" placeholder="选择一个或多个群" select-all />
          </a-form-item>
          <a-form-item :field="`specials[${index}].template`" label="指定模版" tooltip="自定义欢迎模版" extra="输入“[”可以快速插入图片码" :disabled="!formModel.enable" :rules="[{ required: true, message: '必须输入内容' }]"
            feedback>
            <preview-textarea v-model:model-value="item.template" :facePaths="facePaths" />
          </a-form-item>
        </a-card>

        <a-card class="card addCard" size="small" :body-style="{ padding: '0px', height: '100%' }" @click="onCreateCard">
          <p class="addTemp"><icon-plus-circle-fill />点击添加一套模版</p>
        </a-card>

        <div class="actions">
          <a-space direction="horizontal" size="medium">
            <a-button type="primary" :loading="loading" @click="onSubmit">{{ $t('button.submit') }}</a-button>
            <a-button @click="onReset">{{ $t('button.reset') }}</a-button>
          </a-space>
        </div>
      </a-form>

    </div>
  </a-spin>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { padLeft } from '@/utils/string';
import useLoading from '@/hooks/loading';
import { useSettingStore, usePathStore, useGroupStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import { FacePath } from '@/store/modules/path/types';
import type { WelcomeSetting } from '@/store/modules/setting/types';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';

const formRef = ref();
const { loading, setLoading } = useLoading();
const settingStore = useSettingStore();
const groupStore = useGroupStore();
const pathStore = usePathStore();
const facePaths = ref<FacePath[]>([]);
const groupOptions = ref<SelectOptionData[]>([]);
const formModel = ref<WelcomeSetting>({});
const initModel = ref<WelcomeSetting>({});

const onSubmit = async () => {
  try {
    const result = await formRef.value?.validate();
    if (result) {
      Message.error({ content: '数据有误，请重新检查', position: 'top' });
      return;
    }
    setLoading(true);
    await settingStore.saveWelcomeSetting(formModel.value);
    initModel.value = JSON.parse(JSON.stringify(formModel.value));
    Message.success({ content: '保存成功', position: 'top' });
  } catch (error) {
    console.log(error);
    Message.error({ content: '保存失败', position: 'top' });
  }
  finally {
    setLoading(false);
  }
};

const onReset = async () => {
  try {
    setLoading(true);
    formModel.value = JSON.parse(JSON.stringify(initModel.value))
    Message.info({ content: '重置完毕', position: 'top' });
  } catch (error) {
    console.log(error);
  }
  finally {
    setLoading(false);
  }
};

const onCreateCard = async () => {
  formModel.value.specials?.push({});
}

const onDeleteCard = async (index: number) => {
  formModel.value.specials?.splice(index, 1)
}

const fetchFaces = async () => {
  try {
    facePaths.value = await pathStore.loadFacePaths();
  } catch (error) {
    console.log(error);
  }
};

const fetchGroups = async () => {
  try {
    groupOptions.value = await groupStore.getGroupOptions();
  } catch (error) {
    console.log(error);
  }
};

const fetchSettings = async () => {
  try {
    setLoading(true);
    formModel.value = await settingStore.loadWelcomeSetting();
    initModel.value = JSON.parse(JSON.stringify(formModel.value))
  } catch (error) {
    console.log(error);
  }
  finally {
    setLoading(false);
  }
};

fetchFaces();
fetchGroups();
fetchSettings();
</script>

<script lang="ts">
export default {
  name: 'WelcomeSetting',
};
</script>