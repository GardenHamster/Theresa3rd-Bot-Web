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
          <Breadcrumb :items="['menu.settings', 'menu.settings.permissions']" />

          <a-tabs default-active-key="1">
            <a-tab-pane key="1" title="全局">
              <a-form-item field="acceptGroups" label="可用群" tooltip="白名单，只处理这些群的消息" extra="输入群号后按下Enter添加" feedback>
                <group-select v-model:model-value="formModel.acceptGroups" :options="groupOptions" select-all />
              </a-form-item>

              <a-form-item field="superManagers" label="超级管理员" tooltip="超级管理员，可以使用管理员指令" extra="输入QQ号后按下Enter添加" feedback>
                <a-select v-model:model-value="formModel.superManagers" :options="memberOptions" :style="{ minHeight: '100px' }" :scrollbar="true" placeholder="选择一个或多个成员" allow-search allow-clear
                  multiple allow-create>
                </a-select>
              </a-form-item>

              <a-form-item field="limitlessMembers" label="无限制成员" tooltip="功能冷却时间和次数无限制的成员" extra="输入QQ号后按下Enter添加" feedback>
                <a-select v-model:model-value="formModel.limitlessMembers" :options="memberOptions" :scrollbar="true" :style="{ minHeight: '100px' }" placeholder="选择一个或多个成员" allow-search allow-clear
                  multiple allow-create>
                </a-select>
              </a-form-item>
            </a-tab-pane>

            <a-tab-pane key="2" title="涩图">
              <a-form-item field="setuGroups" label="可用群" tooltip="拥有涩图权限的群号" feedback>
                <group-select v-model:model-value="formModel.setuGroups" :options="groupOptions" select-all />
              </a-form-item>

              <a-form-item field="setuShowImgGroups" label="显示图片" tooltip="允许发送图片的群，否则只发送图片链接" feedback>
                <group-select v-model:model-value="formModel.setuShowImgGroups" :options="groupOptions" select-all />
              </a-form-item>

              <a-form-item field="setuShowAIGroups" label="显示AI内容" tooltip="允许发送AI内容的群" feedback>
                <group-select v-model:model-value="formModel.setuShowAIGroups" :options="groupOptions" select-all />
              </a-form-item>

              <a-form-item field="setuShowR18Groups" label="显示R18内容" tooltip="允许出现r18内容的群，但是图片会使用链接代替" feedback>
                <group-select v-model:model-value="formModel.setuShowR18Groups" :options="groupOptions" select-all />
              </a-form-item>

              <a-form-item field="setuShowR18ImgGroups" label="显示R18图片" tooltip="允许发送r18图片的群，图片经过压缩和高斯模糊后发送" feedback>
                <group-select v-model:model-value="formModel.setuShowR18ImgGroups" :options="groupOptions" select-all />
              </a-form-item>

              <a-form-item field="setuCustomGroups" label="自定义搜索" tooltip="允许查找自定义涩图的群" feedback>
                <group-select v-model:model-value="formModel.setuCustomGroups" :options="groupOptions" select-all />
              </a-form-item>

              <a-form-item field="setuNoneCDGroups" label="无冷却" tooltip="涩图没有CD的群" feedback>
                <group-select v-model:model-value="formModel.setuNoneCDGroups" :options="groupOptions" select-all />
              </a-form-item>

              <a-form-item field="setuLimitlessGroups" label="无限次数" tooltip="涩图每日次数无限制的群" feedback>
                <group-select v-model:model-value="formModel.setuLimitlessGroups" :options="groupOptions" select-all />
              </a-form-item>
            </a-tab-pane>

            <a-tab-pane key="3" title="搜图">
              <a-form-item field="saucenaoGroups" label="可用群" tooltip="拥有以图搜图权限的群" feedback>
                <group-select v-model:model-value="formModel.saucenaoGroups" :options="groupOptions" select-all />
              </a-form-item>

              <a-form-item field="saucenaoR18Groups" label="显示R18内容" tooltip="以图搜图允许发送r18结果的群，但是图片会使用链接代替" feedback>
                <group-select v-model:model-value="formModel.saucenaoR18Groups" :options="groupOptions" select-all />
              </a-form-item>
            </a-tab-pane>

            <a-tab-pane key="4" title="订阅">
              <a-form-item field="subscribeGroups" label="可用群" tooltip="拥有订阅权限的群" feedback>
                <group-select v-model:model-value="formModel.subscribeGroups" :options="groupOptions" select-all />
              </a-form-item>
            </a-tab-pane>

            <a-tab-pane key="5" title="日榜">
              <a-form-item field="pixivRankingGroups" label="可用群" tooltip="拥有查询Pixiv日榜权限的群" feedback>
                <group-select v-model:model-value="formModel.pixivRankingGroups" :options="groupOptions" select-all />
              </a-form-item>
            </a-tab-pane>

            <a-tab-pane key="6" title="词云">
              <a-form-item field="wordCloudGroups" label="可用群" tooltip="拥有主动获取群词云权限的群" feedback>
                <group-select v-model:model-value="formModel.wordCloudGroups" :options="groupOptions" select-all />
              </a-form-item>
            </a-tab-pane>

            <a-tab-pane key="7" title="群游戏">
              <a-form-item field="gameGroups" label="可用群" tooltip="拥有创建群游戏权限的群" feedback>
                <group-select v-model:model-value="formModel.gameGroups" :options="groupOptions" select-all />
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
import { useSettingStore, useGroupStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import type { PermissionsSetting } from '@/store/modules/setting/types';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';

const formRef = ref();
const { loading, setLoading } = useLoading();
const settingStore = useSettingStore();
const groupStore = useGroupStore();
const memberOptions = ref<SelectOptionData[]>([]);
const groupOptions = ref<SelectOptionData[]>([]);
const formModel = ref<PermissionsSetting>({});
const initModel = ref<PermissionsSetting>({});

const onSubmit = async () => {
  try {
    const result = await formRef.value?.validate();
    if (result) {
      Message.error({ content: '数据有误，请重新检查', position: 'top' });
      return;
    }
    setLoading(true);
    await settingStore.savePermissionsSetting(formModel.value);
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
    formModel.value = await settingStore.loadPermissionsSetting();
    initModel.value = JSON.parse(JSON.stringify(formModel.value))
  } catch (error) {
    console.log(error);
  }
  finally {
    setLoading(false);
  }
};

fetchGroups();
fetchSettings();
</script>

<script lang="ts">
export default {
  name: 'PermissionsSetting',
};
</script>


