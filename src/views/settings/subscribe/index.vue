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
          <Breadcrumb :items="['menu.settings', 'menu.settings.subscribe']" />
          <a-tabs default-active-key="1">
            <a-tab-pane key="1" title="米游社">
              <a-form-item field="miyoushe.enable" label="启用功能" tooltip="是否启用该功能" feedback>
                <a-switch v-model:model-value="formModel.miyoushe!.enable">
                  <template #checked>ON</template>
                  <template #unchecked>OFF</template>
                </a-switch>
              </a-form-item>
              <a-form-item field="miyoushe.addCommands" label="订阅指令" tooltip="订阅指令，需要管理员执行" extra="输入一个指令后按下Enter添加" :disabled="!formModel.miyoushe!.enable" feedback>
                <a-input-tag v-model:model-value="formModel.miyoushe!.addCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
              </a-form-item>
              <a-form-item field="miyoushe.rmCommands" label="退订指令" tooltip="退订指令，需要管理员执行" extra="输入一个指令后按下Enter添加" :disabled="!formModel.miyoushe!.enable" feedback>
                <a-input-tag v-model:model-value="formModel.miyoushe!.rmCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
              </a-form-item>
              <a-form-item field="miyoushe.template" label="推送模板" tooltip="米游社消息推送模板" extra="输入“{”可以快速插入占位符" :disabled="!formModel.miyoushe!.enable" feedback>
                <a-mention v-model:model-value="formModel.miyoushe!.template" :style="{ minHeight: '120px' }" :prefix="['{']" :data="miyoushePlaceholders" type="textarea" placeholder="不填写将使用默认模板..."
                  auto-size allow-clear />
              </a-form-item>
              <a-form-item field="miyoushe.scanInterval" label="扫描间隔" tooltip="扫描间隔时间" :disabled="!formModel.miyoushe?.enable" feedback>
                <a-input-number v-model:model-value="formModel.miyoushe!.scanInterval" :style="{ maxWidth: '300px' }" :min="10" :max="10000000" placeholder="输入一个数字" mode="button" size="large">
                  <template #suffix>秒</template>
                </a-input-number>
              </a-form-item>
              <a-form-item field="miyoushe.shelfLife" label="保质期" tooltip="超过保质期的贴子将不会再推送，0表示永不过期" :disabled="!formModel.miyoushe?.enable" feedback>
                <a-input-number v-model:model-value="formModel.miyoushe!.shelfLife" :style="{ maxWidth: '300px' }" :min="0" :max="10000000" placeholder="输入一个数字" mode="button" size="large">
                  <template #suffix>秒</template>
                </a-input-number>
              </a-form-item>
            </a-tab-pane>
            <a-tab-pane key="2" title="Pixiv画师">
              <a-form-item field="pixivUser.enable" label="启用功能" tooltip="是否启用该功能" feedback>
                <a-switch v-model:model-value="formModel.pixivUser!.enable">
                  <template #checked>ON</template>
                  <template #unchecked>OFF</template>
                </a-switch>
              </a-form-item>
              <a-form-item field="pixivUser.sendMerge" label="合并推送" tooltip="所有作品扫描完毕后，使用合并方式推送，并且以每次10条的方式推送" :disabled="!formModel.pixivUser!.enable" feedback>
                <a-switch v-model:model-value="formModel.pixivUser!.sendMerge">
                  <template #checked>ON</template>
                  <template #unchecked>OFF</template>
                </a-switch>
              </a-form-item>
              <a-form-item field="pixivUser.addCommands" label="订阅指令" tooltip="订阅指令，需要管理员执行" extra="输入一个指令后按下Enter添加" :disabled="!formModel.pixivUser!.enable" feedback>
                <a-input-tag v-model:model-value="formModel.pixivUser!.addCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
              </a-form-item>
              <a-form-item field="pixivUser.rmCommands" label="退订指令" tooltip="退订指令，需要管理员执行" extra="输入一个指令后按下Enter添加" :disabled="!formModel.pixivUser!.enable" feedback>
                <a-input-tag v-model:model-value="formModel.pixivUser!.rmCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
              </a-form-item>
              <a-form-item field="pixivUser.syncCommands" label="同步指令" tooltip="同步指令，从p站账号中获取关注画师列表并添加到订阅列表中，需要管理员执行" extra="输入一个指令后按下Enter添加" :disabled="!formModel.pixivUser!.enable" feedback>
                <a-input-tag v-model:model-value="formModel.pixivUser!.syncCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
              </a-form-item>
              <a-form-item field="pixivUser.template" label="推送模板" tooltip="Pixiv用户最新作品推送模板" extra="输入“{”可以快速插入占位符" :disabled="!formModel.pixivUser!.enable" feedback>
                <a-mention v-model:model-value="formModel.pixivUser!.template" :style="{ minHeight: '120px' }" :prefix="['{']" :data="pixivUserPlaceholders" type="textarea" placeholder="不填写将使用默认模板..."
                  auto-size allow-clear />
              </a-form-item>
              <a-form-item field="pixivUser.scanMode" label="扫描模式" tooltip="扫描Pixiv画师作品的模式" :disabled="!formModel.pixivUser!.enable" feedback>
                <a-select v-model:model-value="formModel.pixivUser!.scanMode" :options="scanOptions" placeholder="选择一个模式" :scrollbar="true"></a-select>
              </a-form-item>
              <a-form-item field="pixivUser.scanInterval" label="扫描间隔" tooltip="扫描间隔时间" :disabled="!formModel.pixivUser?.enable" feedback>
                <a-input-number v-model:model-value="formModel.pixivUser!.scanInterval" :style="{ maxWidth: '300px' }" :min="60" :max="10000000" placeholder="输入一个数字" mode="button" size="large">
                  <template #suffix>秒</template>
                </a-input-number>
              </a-form-item>
              <a-form-item field="pixivUser.shelfLife" label="保质期" tooltip="超过保质期的作品将不会再推送，0表示永不过期" :disabled="!formModel.pixivUser?.enable" feedback>
                <a-input-number v-model:model-value="formModel.pixivUser!.shelfLife" :style="{ maxWidth: '300px' }" :min="0" :max="10000000" placeholder="输入一个数字" mode="button" size="large">
                  <template #suffix>秒</template>
                </a-input-number>
              </a-form-item>
            </a-tab-pane>
            <a-tab-pane key="3" title="Pixiv标签">
              <a-form-item field="pixivTag.enable" label="启用功能" tooltip="是否启用该功能" feedback>
                <a-switch v-model:model-value="formModel.pixivTag!.enable">
                  <template #checked>ON</template>
                  <template #unchecked>OFF</template>
                </a-switch>
              </a-form-item>
              <a-form-item field="pixivTag.sendMerge" label="合并推送" tooltip="所有作品扫描完毕后，使用合并方式推送，并且以每次10条的方式推送" :disabled="!formModel.pixivTag!.enable" feedback>
                <a-switch v-model:model-value="formModel.pixivTag!.sendMerge">
                  <template #checked>ON</template>
                  <template #unchecked>OFF</template>
                </a-switch>
              </a-form-item>
              <a-form-item field="pixivTag.addCommands" label="订阅指令" tooltip="订阅指令，需要管理员执行" extra="输入一个指令后按下Enter添加" :disabled="!formModel.pixivTag!.enable" feedback>
                <a-input-tag v-model:model-value="formModel.pixivTag!.addCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
              </a-form-item>
              <a-form-item field="pixivTag.rmCommands" label="退订指令" tooltip="退订指令，需要管理员执行" extra="输入一个指令后按下Enter添加" :disabled="!formModel.pixivTag!.enable" feedback>
                <a-input-tag v-model:model-value="formModel.pixivTag!.rmCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
              </a-form-item>
              <a-form-item field="pixivTag.template" label="推送模板" tooltip="Pixiv标签最新作品推送模板" extra="输入“{”可以快速插入占位符" :disabled="!formModel.pixivTag!.enable" feedback>
                <a-mention v-model:model-value="formModel.pixivTag!.template" :style="{ minHeight: '120px' }" :prefix="['{']" :data="pixivTagPlaceholders" type="textarea" placeholder="不填写将使用默认模板..."
                  auto-size allow-clear />
              </a-form-item>
              <a-form-item field="pixivTag.maxScan" label="扫描数量" tooltip="最多扫描标签中前N个作品" :disabled="!formModel.pixivTag?.enable" feedback>
                <a-input-number v-model:model-value="formModel.pixivTag!.maxScan" :style="{ maxWidth: '300px' }" :min="1" :max="1000" placeholder="输入一个数字" mode="button" size="large">
                </a-input-number>
              </a-form-item>
              <a-form-item field="pixivTag.minBookmark" label="最低收藏数" tooltip="作品的最低收藏数，未符合该条件的作品将不会推送" :disabled="!formModel.pixivTag?.enable" feedback>
                <a-input-number v-model:model-value="formModel.pixivTag!.minBookmark" :style="{ maxWidth: '300px' }" :min="0" :max="100000" placeholder="输入一个数字" mode="button" size="large">
                </a-input-number>
              </a-form-item>
              <a-form-item field="pixivTag.minBookPerHour" label="每小时新增数" tooltip="距离作品发布后，每小时至少新增收藏数量，未符合该条件的作品将不会推送" :disabled="!formModel.pixivTag?.enable" feedback>
                <a-input-number v-model:model-value="formModel.pixivTag!.minBookPerHour" :style="{ maxWidth: '300px' }" :min="0" :max="100000" placeholder="输入一个数字" mode="button" size="large">
                </a-input-number>
              </a-form-item>
              <a-form-item field="pixivTag.minBookRate" label="最低收藏率" tooltip="最低收藏率(收藏数/浏览数)，未符合该条件的作品将不会推送" :disabled="!formModel.pixivTag?.enable" feedback>
                <a-input-number v-model:model-value="formModel.pixivTag!.minBookRate" :style="{ maxWidth: '300px' }" :min="0" :max="1" :precision="2" :step="0.01" placeholder="输入一个数字" mode="button"
                  size="large">
                </a-input-number>
              </a-form-item>
              <a-form-item field="pixivTag.scanInterval" label="扫描间隔" tooltip="扫描间隔时间" :disabled="!formModel.pixivTag?.enable" feedback>
                <a-input-number v-model:model-value="formModel.pixivTag!.scanInterval" :style="{ maxWidth: '300px' }" :min="60" :max="10000000" placeholder="输入一个数字" mode="button" size="large">
                  <template #suffix>秒</template>
                </a-input-number>
              </a-form-item>
              <a-form-item field="pixivTag.shelfLife" label="保质期" tooltip="超过保质期的作品将不会再推送，0表示永不过期" :disabled="!formModel.pixivTag?.enable" feedback>
                <a-input-number v-model:model-value="formModel.pixivTag!.shelfLife" :style="{ maxWidth: '300px' }" :min="0" :max="10000000" placeholder="输入一个数字" mode="button" size="large">
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
import { useSettingStore, usePathStore, useGroupStore, useOptionStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import { FacePath } from '@/store/modules/path/types';
import type { SubscribeSetting } from '@/store/modules/setting/types';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';

const formRef = ref();
const { loading, setLoading } = useLoading();
const settingStore = useSettingStore();
const groupStore = useGroupStore();
const pathStore = usePathStore();
const optionStore = useOptionStore();
const facePaths = ref<FacePath[]>([]);
const scanOptions = ref<SelectOptionData[]>([]);
const groupOptions = ref<SelectOptionData[]>([]);
const formModel = ref<SubscribeSetting>({ miyoushe: {}, pixivUser: {}, pixivTag: {} });
const initModel = ref<SubscribeSetting>({});

const miyoushePlaceholders = ref<SelectOptionData[]>([
  { label: '{UserName}:版主名称', value: 'UserName}' },
  { label: '{CreateTime}:发布时间', value: 'CreateTime}' },
  { label: '{Title}:帖子标题', value: 'Title}' },
  { label: '{Content}:帖子内容', value: 'Content}' },
  { label: '{Urls}:帖子链接', value: 'Urls}' },
]);

const pixivUserPlaceholders = ref<SelectOptionData[]>([
  { label: '{UserName}:画师名称', value: 'UserName}' },
]);

const pixivTagPlaceholders = ref<SelectOptionData[]>([
  { label: '{TagName}:订阅标签', value: 'TagName}' },
]);

const onSubmit = async () => {
  try {
    const result = await formRef.value?.validate();
    if (result) {
      Message.error({ content: '数据有误，请重新检查', position: 'top' });
      return;
    }
    setLoading(true);
    await settingStore.saveSubscribeSetting(formModel.value);
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

const fetchPixivUserScanOptions = async () => {
  try {
    scanOptions.value = await optionStore.loadPixivUserScanOptions();
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
    formModel.value = await settingStore.loadSubscribeSetting();
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
fetchPixivUserScanOptions();
fetchSettings();
</script>

<script lang="ts">
export default {
  name: 'SubscribeSetting',
};
</script>