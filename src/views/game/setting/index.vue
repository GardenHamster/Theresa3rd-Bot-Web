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
  <a-spin class="spin" :loading="loading" tip="加载中..." :size="35">
    <div class="container">
      <a-form ref="formRef" layout="horizontal" size="large" :auto-label-width="true" :scroll-to-first-error="true" :model="formModel">
        <a-card class="card">
          <save-warning :initModel="initModel" :formModel="formModel" />
          <Breadcrumb :items="['menu.game', 'menu.game.setting']" />

          <a-tabs default-active-key="1">
            <a-tab-pane key="1" title="全局">
              <a-form-item field="enable" label="启用功能" tooltip="是否启用该功能" feedback>
                <a-switch v-model:model-value="formModel.enable">
                  <template #checked>ON</template>
                  <template #unchecked>OFF</template>
                </a-switch>
              </a-form-item>
              <a-form-item field="joinCommands" label="加入游戏指令" tooltip="加入游戏命令" extra="输入一个指令后按下Enter添加" :disabled="!formModel.enable" feedback>
                <a-input-tag v-model:model-value="formModel.joinCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
              </a-form-item>
              <a-form-item field="stopCommands" label="结束游戏指令" tooltip="结束游戏命令，需要管理员权限" extra="输入一个指令后按下Enter添加" :disabled="!formModel.enable" feedback>
                <a-input-tag v-model:model-value="formModel.stopCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
              </a-form-item>
            </a-tab-pane>
            <a-tab-pane key="2" title="谁是卧底">
              <a-form-item field="undercover.enable" label="启用功能" tooltip="是否启用该功能" :disabled="!formModel.enable" feedback>
                <a-switch v-model:model-value="formModel.enable">
                  <template #checked>ON</template>
                  <template #unchecked>OFF</template>
                </a-switch>
              </a-form-item>
              <a-form-item field="undercover.createCommands" label="创建游戏指令" tooltip="创建游戏指令" extra="输入一个指令后按下Enter添加" :disabled="!formModel?.enable || !formModel.undercover?.enable" feedback>
                <a-input-tag v-model:model-value="formModel.undercover!.createCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
              </a-form-item>
              <a-form-item field="undercover.addWordCommands" label="创建词条指令" tooltip="新增词条命令，需要私聊使用" extra="输入一个指令后按下Enter添加" :disabled="!formModel?.enable || !formModel.undercover?.enable" feedback>
                <a-input-tag v-model:model-value="formModel.undercover!.addWordCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
              </a-form-item>
              <a-form-item field="undercover.sendWordCommands" label="查询词条指令" tooltip="游戏中获取词条命令" extra="输入一个指令后按下Enter添加" :disabled="!formModel?.enable || !formModel.undercover?.enable" feedback>
                <a-input-tag v-model:model-value="formModel.undercover!.sendWordCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
              </a-form-item>
              <a-form-item field="undercover.ruleMsg" label="发送规则" tooltip="游戏开始后发送的游戏规则消息，不填表示不发送" extra="输入“[”可以快速插入图片码" feedback>
                <preview-textarea v-model:model-value="formModel.undercover!.ruleMsg" :facePaths="facePaths" />
              </a-form-item>
              <a-form-item field="undercover.matchSeconds" label="匹配时长" tooltip="等待玩家加入的时长(秒)" :disabled="!formModel?.enable || !formModel.undercover?.enable" feedback>
                <a-input-number v-model:model-value="formModel.undercover!.matchSeconds" :style="{ maxWidth: '300px' }" :min="0" :max="300" placeholder="输入一个正整数" mode="button" size="large">
                  <template #suffix>秒</template>
                </a-input-number>
              </a-form-item>
              <a-form-item field="undercover.prepareSeconds" label="预备时长" tooltip="派发词条后，进入发言环节前的准备时长" :disabled="!formModel?.enable || !formModel.undercover?.enable" feedback>
                <a-input-number v-model:model-value="formModel.undercover!.prepareSeconds" :style="{ maxWidth: '300px' }" :min="0" :max="300" placeholder="输入一个正整数" mode="button" size="large">
                  <template #suffix>秒</template>
                </a-input-number>
              </a-form-item>
              <a-form-item field="undercover.speakingSeconds" label="发言时长" tooltip="每个玩家的发言时长" :disabled="!formModel?.enable || !formModel.undercover?.enable" feedback>
                <a-input-number v-model:model-value="formModel.undercover!.speakingSeconds" :style="{ maxWidth: '300px' }" :min="0" :max="300" placeholder="输入一个正整数" mode="button" size="large">
                  <template #suffix>秒</template>
                </a-input-number>
              </a-form-item>
              <a-form-item field="undercover.maxSimilarity" label="发言相似度" tooltip="限制发言与历史发言的最大相似度" :disabled="!formModel?.enable || !formModel.undercover?.enable" feedback>
                <a-input-number v-model:model-value="formModel.undercover!.maxSimilarity" :style="{ maxWidth: '300px' }" :min="0" :max="100" placeholder="输入一个百分比" mode="button" size="large">
                  <template #suffix>%</template>
                </a-input-number>
              </a-form-item>
              <a-form-item field="undercover.votingSeconds" label="投票时长" tooltip="投票环节时长" :disabled="!formModel?.enable || !formModel.undercover?.enable" feedback>
                <a-input-number v-model:model-value="formModel.undercover!.votingSeconds" :style="{ maxWidth: '300px' }" :min="0" :max="300" placeholder="输入一个正整数" mode="button" size="large">
                  <template #suffix>秒</template>
                </a-input-number>
              </a-form-item>
              <a-form-item field="undercover.muteSeconds" label="失败禁言" tooltip="失败方被禁言的时长，0：表示不禁言" :disabled="!formModel?.enable || !formModel.undercover?.enable" feedback>
                <a-input-number v-model:model-value="formModel.undercover!.muteSeconds" :style="{ maxWidth: '300px' }" :min="0" :max="300" placeholder="输入一个正整数" mode="button" size="large">
                  <template #suffix>秒</template>
                </a-input-number>
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
  </a-spin>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useLoading from '@/hooks/loading';
import { useSettingStore, usePathStore, useGroupStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import { FacePath } from '@/store/modules/path/types';
import type { GameSetting } from '@/store/modules/setting/types';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';

const formRef = ref();
const { loading, setLoading } = useLoading();
const settingStore = useSettingStore();
const groupStore = useGroupStore();
const pathStore = usePathStore();
const facePaths = ref<FacePath[]>([]);
const groupOptions = ref<SelectOptionData[]>([]);
const formModel = ref<GameSetting>({ undercover: {} });
const initModel = ref<GameSetting>({});

const onSubmit = async () => {
  try {
    const result = await formRef.value?.validate();
    if (result) {
      Message.error({ content: '数据有误，请重新检查', position: 'top' });
      return;
    }
    setLoading(true);
    await settingStore.saveGameSetting(formModel.value);
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
    setLoading(true);
    formModel.value = await settingStore.loadGameSetting();
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
  name: 'GameSetting',
};
</script>