<style scoped lang="less">
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

.delContent {
  cursor: pointer;
  color: var(--color-text-2);
}

.addContent {
  cursor: pointer;
  color: rgb(var(--primary-6));
  margin-right: 10px;
}
</style>

<template>
  <div class="container">
    <a-form ref="formRef" layout="horizontal" size="large" :auto-label-width="true" :scroll-to-first-error="true"
      :model="formModel">

      <a-card class="card">
        <save-warning :initModel="initModel" :formModel="formModel" />
        <Breadcrumb :items="['menu.settings', 'menu.settings.reminder']" />
        <a-form-item field="enable" label="是否启用" tooltip="是否启用该功能" :style="{ marginBottom: '0px' }" feedback>
          <a-switch v-model:model-value="formModel.enable">
            <template #checked>ON</template>
            <template #unchecked>OFF</template>
          </a-switch>
        </a-form-item>
      </a-card>

      <a-card class="card" v-for="(item, timerIndex) of  formModel.timers " :key="timerIndex" :title="`模板${padLeft((timerIndex + 1).toString(), (0).toString(), 2)}`">
        <template #extra>
          <a-popconfirm @ok="onDeleteCard(timerIndex)" content="确定要删除这个模版吗？" type="warning" position="br">
            <span class="delCard">删除</span>
          </a-popconfirm>
        </template>

        <a-form-item :field="`timers[${timerIndex}].enable`" label="开启" tooltip="是否启用该定时器" :disabled="!formModel.enable"
          feedback>
          <a-switch v-model:model-value="item.enable">
            <template #checked>ON</template>
            <template #unchecked>OFF</template>
          </a-switch>
        </a-form-item>

        <a-form-item :field="`timers[${timerIndex}].name`" label="名称" tooltip="定时器名称"
          :disabled="!formModel.enable || !item.enable" :rules="[{ required: true, message: '必须输入名称' }]" feedback>
          <a-input v-model:model-value="item.name" placeholder="输入一个名称" allow-clear />
        </a-form-item>

        <a-form-item :field="`timers[${timerIndex}].cron`" label="Corn" tooltip="定时器Cron表达式，详细可以百度Cron在线生成"
          :disabled="!formModel.enable || !item.enable" :rules="[{ required: true, message: '必须输入一个Cron表达式' }]" feedback>
          <a-input v-model:model-value="item.cron" placeholder="输入一个Cron表达式" allow-clear />
        </a-form-item>

        <a-form-item :field="`timers[${timerIndex}].groups`" label="发送群" tooltip="将提醒内容发送到群"
          :disabled="!formModel.enable || !item.enable" :rules="[{ required: true, message: '至少选择一个群' }]" feedback>
          <group-select v-model:model-value="item.groups" :options="groupOptions" select-all />
        </a-form-item>

        <a-form-item :field="`timers[${timerIndex}].atAll`" label="艾特全体" tooltip="是否艾特全体"
          :disabled="!formModel.enable || !item.enable" feedback>
          <a-switch v-model:model-value="item.atAll">
            <template #checked>ON</template>
            <template #unchecked>OFF</template>
          </a-switch>
        </a-form-item>

        <a-form-item :field="`timers[${timerIndex}].atMembers`" label="艾特成员" tooltip="指定使用该模版的群"
          :disabled="!formModel.enable || !item.enable" feedback>
          <a-select v-model:model-value="item.atMembers" :style="{ minHeight: '100px' }" :scrollbar="true"
            placeholder="选择一个或多个成员" allow-search allow-clear multiple allow-create>
          </a-select>
        </a-form-item>

        <a-form-item v-for="(temp, tempIndex) of  item.templates " :key="tempIndex"
          :field="`timers[${timerIndex}].templates[${tempIndex}].template`" :label="`内容${padLeft((tempIndex + 1).toString(), (0).toString(), 2)}`" tooltip="提醒内容模版" extra="输入“[”可以快速插入图片码"
          :disabled="!formModel.enable || !item.enable" :rules="[{ required: true, message: '必须输入内容' }]" feedback>
          <template #extra>
            <div :style="{ marginTop: '5px' }">
              <span class="addContent" @click="onCreateContent(timerIndex, tempIndex)">新增内容</span>
              <span class="delContent" @click="onDeleteContent(timerIndex, tempIndex)">删除内容</span>
            </div>
          </template>
          <preview-textarea v-model:model-value="temp.template" :facePaths="facePaths" />
        </a-form-item>
        
      </a-card>

      <a-card class="card addCard" size="small" :body-style="{ padding: '0px', height: '100%' }" :style="{ marginTop: '5px' }" @click="onCreateCard">
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
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { padLeft } from '@/utils/string';
import useLoading from '@/hooks/loading';
import { useSettingStore, usePathStore, useGroupStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import { FacePath } from '@/store/modules/path/types';
import type { ReminderSetting } from '@/store/modules/setting/types';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';

const formRef = ref();
const { loading, setLoading } = useLoading();
const settingStore = useSettingStore();
const groupStore = useGroupStore();
const pathStore = usePathStore();
const facePaths = ref<FacePath[]>([]);
const groupOptions = ref<SelectOptionData[]>([]);
const formModel = ref<ReminderSetting>({});
const initModel = ref<ReminderSetting>({});

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
  formModel.value.timers?.push({ templates: [{ template: '' }] });
}

const onDeleteCard = async (index: number) => {
  formModel.value.timers?.splice(index, 1)
}

const onCreateContent = async (timerIndex: number, tempIndex: number) => {
  if (!formModel.value.timers) return;
  if (formModel.value.timers.length <= timerIndex) return;
  formModel.value.timers[timerIndex].templates?.splice(tempIndex + 1, 0, { template: '' })
}

const onDeleteContent = async (timerIndex: number, tempIndex: number) => {
  if (!formModel.value.timers) return;
  if (formModel.value.timers.length <= timerIndex) return;
  const templateItems = formModel.value.timers[timerIndex].templates;
  if (!templateItems || templateItems.length <= 1) {
    Message.error({ content: '必须至少保留一条内容', position: 'top' });
  }
  else {
    templateItems.splice(tempIndex, 1);
  }
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
    groupOptions.value = await groupStore.loadGroupOptions();
  } catch (error) {
    console.log(error);
  }
};

const fetchSettings = async () => {
  try {
    formModel.value = await settingStore.loadReminderSetting();
    initModel.value = JSON.parse(JSON.stringify(formModel.value))
  } catch (error) {
    console.log(error);
  }
};

fetchFaces();
fetchGroups();
fetchSettings();
</script>

<script lang="ts">
export default {
  name: 'ReminderSetting',
};
</script>