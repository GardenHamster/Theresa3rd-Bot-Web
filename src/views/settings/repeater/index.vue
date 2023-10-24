<style scoped lang="less">
.container {
  height: 100%;
  margin-bottom: 50px;
  overflow: auto;
}

.card {
  padding-bottom: 25px;
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
</style>

<template>
  <div class="container">
    <a-form ref="formRef" layout="horizontal" size="large" :auto-label-width="true" :scroll-to-first-error="true"
      :model="formModel">
      <a-card class="card">

        <save-warning :initModel="initModel" :formModel="formModel" />

        <Breadcrumb :items="['menu.settings', 'menu.settings.repeater']" />

        <a-form-item field="enable" label="是否启用" tooltip="是否启用该功能" feedback>
          <a-switch v-model:model-value="formModel.enable">
            <template #checked>ON</template>
            <template #unchecked>OFF</template>
          </a-switch>
        </a-form-item>

        <a-form-item field="repeatTime" label="触发次数" tooltip="触发复读的次数" :disabled="!formModel.enable" feedback>
          <a-input-number v-model:model-value="formModel.repeatTime" :style="{ maxWidth: '300px' }" :min="1"
            placeholder="输入一个数字" mode="button" size="large" />
        </a-form-item>

        <a-form-item field="repeatMode" label="复读模式" tooltip="复读模式" :disabled="!formModel.enable" feedback>
          <a-select v-model:model-value="formModel.repeatMode" :style="{ maxWidth: '300px' }" placeholder="选择一个模式"
            :scrollbar="true">
            <a-option :value="0">普通模式</a-option>
          </a-select>
        </a-form-item>

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
import useLoading from '@/hooks/loading';
import { useSettingStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import type { RepeaterSetting } from '@/store/modules/setting/types';

const formRef = ref();
const { loading, setLoading } = useLoading();
const settingStore = useSettingStore();
const formModel = ref<RepeaterSetting>({});
const initModel = ref<RepeaterSetting>({});

const onSubmit = async () => {
  try {
    const result = await formRef.value?.validate();
    if (result) {
      Message.error({ content: '数据有误，请重新检查', position: 'top' });
      return;
    }
    setLoading(true);
    await settingStore.saveRepeaterSetting(formModel.value);
    initModel.value = { ...formModel.value };
    formModel.value = { ...formModel.value };
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
    formModel.value = { ...initModel.value };
    Message.info({ content: '重置完毕', position: 'top' });
  } catch (error) {
    console.log(error);
  }
  finally {
    setLoading(false);
  }
};

const fetchSettings = async () => {
  try {
    initModel.value = await settingStore.loadRepeaterSetting();
    formModel.value = { ...initModel.value };
  } catch (error) {
    console.log(error);
  }
};

fetchSettings();
</script>

<script lang="ts">
export default {
  name: 'RepeaterSetting',
};
</script>