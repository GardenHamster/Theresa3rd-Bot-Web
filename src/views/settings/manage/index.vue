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

        <SaveWarning :initModel="initModel" :formModel="formModel" />

        <Breadcrumb :items="['menu.settings', 'menu.settings.manage']" />

        <a-tabs default-active-key="1">
          <a-tab-pane key="1" title="Cookie更新">
            <a-form-item field="pixivCookieCommands" label="Pixiv" tooltip="更新Pixiv Cookie指令，需要私聊使用"
              extra="输入一个指令后按下Enter添加" feedback>
              <a-input-tag v-model:model-value="formModel.pixivCookieCommands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>

            <a-form-item field="saucenaoCookieCommands" label="Saucenao" tooltip="更新Saucenao Cookie指令，需要私聊使用"
              extra="输入一个指令后按下Enter添加" feedback>
              <a-input-tag v-model:model-value="formModel.saucenaoCookieCommands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>
          </a-tab-pane>

          <a-tab-pane key="2" title="黑名单">
            <a-form-item field="disableMemberCommands" label="拉黑成员" tooltip="将一个群员拉入黑名单，忽略该成员发送的所有指令"
              extra="输入一个指令后按下Enter添加" feedback>
              <a-input-tag v-model:model-value="formModel.disableMemberCommands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>

            <a-form-item field="enableMemberCommands" label="解禁成员" tooltip="将一个群员从黑名单中移除，使其可以继续使用指令"
              extra="输入一个指令后按下Enter添加" feedback>
              <a-input-tag v-model:model-value="formModel.enableMemberCommands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>

            <a-form-item field="disableTagCommands" label="屏蔽标签" tooltip="屏蔽一个涩图标签，屏蔽后不允许被搜索，并且不会推送该作品"
              extra="输入一个指令后按下Enter添加" feedback>
              <a-input-tag v-model:model-value="formModel.disableTagCommands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>

            <a-form-item field="enableTagCommands" label="解禁标签" tooltip="取消屏蔽一个涩图标签" extra="输入一个指令后按下Enter添加" feedback>
              <a-input-tag v-model:model-value="formModel.enableTagCommands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>
          </a-tab-pane>

          <a-tab-pane key="3" title="订阅管理">
            <a-form-item field="listSubCommands" label="查询订阅" tooltip="列出所在群中的所有订阅信息" extra="输入一个指令后按下Enter添加" feedback>
              <a-input-tag v-model:model-value="formModel.listSubCommands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>

            <a-form-item field="removeSubCommands" label="取消订阅" tooltip="通过订阅Id移除一个订阅" extra="输入一个指令后按下Enter添加" feedback>
              <a-input-tag v-model:model-value="formModel.removeSubCommands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>
          </a-tab-pane>

          <a-tab-pane key="4" title="标签绑定">
            <a-form-item field="bindTagCommands" label="绑定标签" tooltip="将一个或多个Pixiv标签绑定到一个或多个关键词中，使用该关键词可以直接搜索与之绑定的Pixiv标签"
              extra="输入一个指令后按下Enter添加" feedback>
              <a-input-tag v-model:model-value="formModel.bindTagCommands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>

            <a-form-item field="unBindTagCommands" label="解绑标签" tooltip="解除关键词绑定" extra="输入一个指令后按下Enter添加" feedback>
              <a-input-tag v-model:model-value="formModel.unBindTagCommands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
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
import type { ManageSetting } from '@/store/modules/setting/types';

const formRef = ref();
const { loading, setLoading } = useLoading();
const settingStore = useSettingStore();
const formModel = ref<ManageSetting>({});
const initModel = ref<ManageSetting>({});

const onSubmit = async () => {
  try {
    const result = await formRef.value?.validate();
    if (result) {
      Message.error({ content: '数据有误，请重新检查', position: 'top' });
      return;
    }
    setLoading(true);
    await settingStore.saveManageSetting(formModel.value);
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

const fetchSettings = async () => {
  try {
    formModel.value = await settingStore.loadManageSetting();
    initModel.value = JSON.parse(JSON.stringify(formModel.value))
  } catch (error) {
    console.log(error);
  }
};

fetchSettings();
</script>

<script lang="ts">
export default {
  name: 'ManageSetting',
};
</script>


