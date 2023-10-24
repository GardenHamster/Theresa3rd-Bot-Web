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

        <Breadcrumb :items="['menu.settings', 'menu.settings.general']" />

        <a-form-item field="prefixs" label="指令前缀" tooltip="指令前缀，Bot只会处理带有前缀的指令，如：(#菜单)，你也可以不设置任何前缀。输入后按下回车添加，可同时设置多个前缀"
          feedback>
          <a-input-tag v-model:model-value="formModel.prefixs" v-model:input-value="inputModel.prefixs"
            placeholder="输入后按下回车添加" allow-clear />
        </a-form-item>

        <a-form-item field="sendRelevantCommands" label="指令提示" tooltip="发送的指令不存在时，是否提示相关的可用指令" feedback>
          <a-switch v-model:model-value="formModel.sendRelevantCommands">
            <template #checked>ON</template>
            <template #unchecked>OFF</template>
          </a-switch>
        </a-form-item>

        <a-form-item field="tempPath" label="缓存目录" tooltip="下载图片等文件的临时存放目录" feedback>
          <a-input v-model:model-value="formModel.tempPath" placeholder="输入一个相对路径或者绝对路径" allow-clear />
        </a-form-item>

        <a-form-item field="fontPath" label="字体路径" tooltip="默认字体路径" feedback>
          <a-auto-complete v-model:model-value="formModel.fontPath" :data="fontPathOptions" placeholder="输入一个相对路径或者绝对路径"
            allow-clear @search="searchFontPath" />
        </a-form-item>

        <a-form-item field="clearCron" label="定时清理" :rules="cronRules" tooltip="定时清理Cron表达式，详细可以百度Cron在线生成" feedback>
          <a-input v-model:model-value="formModel.clearCron" placeholder="输入一个Cron表达式" allow-clear />
        </a-form-item>

        <a-form-item field="errorGroups" label="日志群" tooltip="发生错误时会将日志发送到这些群" feedback>
          <a-select v-model:model-value="formModel.errorGroups" :options="groupOptions" placeholder="选择任意群"
            :scrollbar="true" allow-search allow-clear multiple>
          </a-select>
        </a-form-item>

        <a-form-item field="errorImgPath" label="替代图片" tooltip="图片下载失败时，用于代替展示的图片" feedback>
          <a-space direction="vertical" :style="{ width: '100%' }" size="small">
            <a-auto-complete v-model:model-value="formModel.errorImgPath" :data="facePathOptions"
              placeholder="输入一个相对路径或者绝对路径" allow-clear @search="searchFacePath" @change="showErrorImg" />
            <a-image width="100px" :src="errorImgUrl" v-show="errorImgvisable" />
          </a-space>
        </a-form-item>

        <a-form-item field="errorMsg" label="错误提示" tooltip="处理异常时返回的消息" extra="输入“[”可以快速插入图片码" feedback>
          <preview-textarea v-model:model-value="formModel.errorMsg" :facePaths="facePaths" />
        </a-form-item>

        <a-form-item field="disableMsg" label="禁用提示" tooltip="发送某个指令但是被禁用时返回的消息" extra="输入“[”可以快速插入图片码" feedback>
          <preview-textarea v-model:model-value="formModel.disableMsg" :facePaths="facePaths" />
        </a-form-item>

        <a-form-item field="noPermissionsMsg" label="无权限提示" tooltip="发送某个指令但是缺少使用权限时时返回的消息" extra="输入“[”可以快速插入图片码"
          feedback>
          <preview-textarea v-model:model-value="formModel.noPermissionsMsg" :facePaths="facePaths" />
        </a-form-item>

        <a-form-item field="managersRequiredMsg" label="非管理员提示" tooltip="发送某个指令但是缺少管理员权限时返回的消息" extra="输入“[”可以快速插入图片码"
          feedback>
          <preview-textarea v-model:model-value="formModel.managersRequiredMsg" :facePaths="facePaths" />
        </a-form-item>

        <a-form-item field="setuCustomDisableMsg" label="涩图禁用提示" tooltip="涩图功能被禁用时返回的消息" extra="输入“[”可以快速插入图片码" feedback>
          <preview-textarea v-model:model-value="formModel.setuCustomDisableMsg" :facePaths="facePaths" />
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
import { List } from 'linqts';
import { ref, reactive, computed, watch } from 'vue';
import useLoading from '@/hooks/loading';
import { useSettingStore, usePathStore, useGroupStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import { FacePath } from '@/store/modules/path/types';
import type { GeneralSetting } from '@/store/modules/setting/types';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import cronRules from '@/utils/validator'
import { getFaceHttpUrl } from '@/utils/url'

const errorImgUrl = ref('');
const errorImgvisable = ref(false);
const { loading, setLoading } = useLoading();
const settingStore = useSettingStore();
const pathStore = usePathStore();
const groupStore = useGroupStore();
const formRef = ref();
const facePaths = ref<FacePath[]>([]);
const groupOptions = ref<SelectOptionData[]>([]);
const fontPathOptions = ref<string[]>([]);
const facePathOptions = ref<string[]>([]);
const formModel = ref<GeneralSetting>({});
const initModel = ref<GeneralSetting>({});
const inputModel = reactive({
  prefixs: ''
});

const onSubmit = async () => {
  try {
    const result = await formRef.value?.validate();
    if (result) {
      Message.error({ content: '数据有误，请重新检查', position: 'top' });
      return;
    }
    setLoading(true);
    await settingStore.saveGeneralSetting(formModel.value);
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
    console.log('formModel', formModel.value);
    formModel.value = { ...initModel.value };
    Message.info({ content: '重置完毕', position: 'top' });
  } catch (error) {
    console.log(error);
  }
  finally {
    setLoading(false);
  }
};

const searchFontPath = async () => {
  fontPathOptions.value = await pathStore.loadFontPaths();
}

const searchFacePath = async () => {
  facePathOptions.value = await pathStore.loadFaceServerPaths();
}

const showErrorImg = async () => {
  const serverPath = formModel.value.errorImgPath?.trim() ?? '';
  errorImgvisable.value = serverPath.length > 0;
  if (serverPath.length === 0) return;
  const facePaths = await pathStore.loadFacePaths();
  const httpPath = new List<FacePath>(facePaths).Where(o => o?.serverPath === serverPath).FirstOrDefault()?.httpPath;
  if (!httpPath || httpPath.length === 0) return;
  const imgHttpUrl = getFaceHttpUrl(httpPath);
  errorImgUrl.value = imgHttpUrl;
}

const fetchGroups = async () => {
  try {
    groupOptions.value = await groupStore.loadGroupOptions();
  } catch (error) {
    console.log(error);
  }
};

const fetchFaces = async () => {
  try {
    facePaths.value = await pathStore.loadFacePaths();
  } catch (error) {
    console.log(error);
  }
};

const fetchSettings = async () => {
  try {
    initModel.value = await settingStore.loadGeneralSetting();
    formModel.value = { ...initModel.value };
    await showErrorImg();
  } catch (error) {
    console.log(error);
  }
};

fetchGroups();
fetchFaces();
fetchSettings();
searchFontPath();
searchFacePath();
</script>

<script lang="ts">
export default {
  name: 'GeneralSetting',
};
</script>


