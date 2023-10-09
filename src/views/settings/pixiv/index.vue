<style scoped lang="less">
.container {
  margin-bottom: 100px;
  overflow: hidden;
}

.card {
  min-width: 300px;
  padding-bottom: 25px;
  position: relative;
  overflow: auto;
}

.alert {
  position: absolute;
  left: 0;
}

.actions {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 15px 30px 15px 0;
  background: var(--color-bg-2);
  text-align: right;
}
</style>

<template>
  <div class="container">
    <a-form ref="formRef" layout="horizontal" size="large" :auto-label-width="true" :scroll-to-first-error="true"
      :model="formModel">
      <a-card class="card">

        <a-alert class="alert" type="warning" v-show="saveWarning" center>某些属性值已经被修改，但是还未进行保存</a-alert>

        <Breadcrumb :items="['menu.settings', 'menu.settings.pixiv']" />

        <a-form-item field="httpProxy" label="Http代理" tooltip="下载图片等文件的临时存放目录" feedback>
          <a-input v-model:model-value="formModel.httpProxy" placeholder="输入一个相对路径或者绝对路径" allow-clear />
        </a-form-item>

        <a-form-item field="imgProxy" label="图片代理" tooltip="下载图片等文件的临时存放目录" feedback>
          <a-input v-model:model-value="formModel.httpProxy" placeholder="输入一个相对路径或者绝对路径" allow-clear />
        </a-form-item>

        <a-form-item field="originUrlProxy" label="链接代理" tooltip="下载图片等文件的临时存放目录" feedback>
          <a-input v-model:model-value="formModel.originUrlProxy" placeholder="输入一个相对路径或者绝对路径" allow-clear />
        </a-form-item>

        <a-form-item field="freeProxy" label="免代理模式" tooltip="发送的指令不存在时，是否提示相关的可用指令" feedback>
          <a-switch v-model:model-value="formModel.freeProxy">
            <template #checked>ON</template>
            <template #unchecked>OFF</template>
          </a-switch>
        </a-form-item>

        <a-form-item field="imgShowMaximum" label="图片数量" tooltip="下载图片等文件的临时存放目录" feedback>
          <a-input-number v-model:model-value="formModel.imgShowMaximum" :style="{ width: '320px' }"
            placeholder="Please Enter" mode="button" size="large" />
        </a-form-item>

        <a-form-item field="tagShowMaximum" label="标签数量" tooltip="下载图片等文件的临时存放目录" feedback>
          <a-input-number v-model:model-value="formModel.tagShowMaximum" :style="{ width: '320px' }"
            placeholder="Please Enter" mode="button" size="large" />
        </a-form-item>

        <a-form-item field="urlShowMaximum" label="链接数量" tooltip="下载图片等文件的临时存放目录" feedback>
          <a-input-number v-model:model-value="formModel.urlShowMaximum" :style="{ width: '320px' }"
            placeholder="Please Enter" mode="button" size="large" />
        </a-form-item>

        <a-form-item field="imgSize" label="图片尺寸" tooltip="发生错误时会将日志发送到这些群" feedback>
          <a-select v-model:model-value="formModel.imgSize" :options="groupOptions" placeholder="选择任意群"
            :scrollbar="true"></a-select>
        </a-form-item>

        <a-form-item field="imgResend" label="重发模式" tooltip="发生错误时会将日志发送到这些群" feedback>
          <a-select v-model:model-value="formModel.imgResend" :options="groupOptions" placeholder="选择任意群"
            :scrollbar="true"></a-select>
        </a-form-item>

        <a-form-item field="r18ImgBlur" label="高斯模糊" tooltip="下载图片等文件的临时存放目录" feedback>
          <a-input-number v-model:model-value="formModel.r18ImgBlur" :style="{ width: '320px' }"
            placeholder="Please Enter" mode="button" size="large" />
        </a-form-item>

        <a-form-item field="sendImgBehind" label="分别发送" tooltip="发送的指令不存在时，是否提示相关的可用指令" feedback>
          <a-switch v-model:model-value="formModel.sendImgBehind">
            <template #checked>ON</template>
            <template #unchecked>OFF</template>
          </a-switch>
        </a-form-item>

        <a-form-item field="imgRetryTimes" label="图片重试次数" tooltip="下载图片等文件的临时存放目录" feedback>
          <a-input-number v-model:model-value="formModel.imgRetryTimes" :style="{ width: '320px' }"
            placeholder="Please Enter" mode="button" size="large" />
        </a-form-item>

        <a-form-item field="errRetryTimes" label="错误重试次数" tooltip="下载图片等文件的临时存放目录" feedback>
          <a-input-number v-model:model-value="formModel.errRetryTimes" :style="{ width: '320px' }"
            placeholder="Please Enter" mode="button" size="large" />
        </a-form-item>

        <a-form-item field="cookieExpire" label="Cookie存活" tooltip="下载图片等文件的临时存放目录" feedback>
          <a-input-number v-model:model-value="formModel.cookieExpire" :style="{ width: '320px' }"
            placeholder="Please Enter" mode="button" size="large" />
        </a-form-item>

        <a-form-item field="cookieExpireMsg" label="过期提示" tooltip="处理异常时返回的消息" feedback>
          <preview-textarea v-model:model-value="formModel.cookieExpireMsg" />
        </a-form-item>

        <a-form-item field="template" label="发送模板" tooltip="处理异常时返回的消息" feedback>
          <preview-textarea v-model:model-value="formModel.template" />
        </a-form-item>

        <a-form-item field="generalTarget" label="一般指标" tooltip="下载图片等文件的临时存放目录" feedback>
          <a-input-number v-model:model-value="formModel.generalTarget" :style="{ width: '320px' }"
            placeholder="Please Enter" mode="button" size="large" />
        </a-form-item>

        <a-form-item field="aITarget" label="AI指标" tooltip="下载图片等文件的临时存放目录" feedback>
          <a-input-number v-model:model-value="formModel.aITarget" :style="{ width: '320px' }" placeholder="Please Enter"
            mode="button" size="large" />
        </a-form-item>

        <a-form-item field="r18Target" label="R18指标" tooltip="下载图片等文件的临时存放目录" feedback>
          <a-input-number v-model:model-value="formModel.r18Target" :style="{ width: '320px' }" placeholder="Please Enter"
            mode="button" size="large" />
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
import { ref, reactive, computed, watch } from 'vue';
import useLoading from '@/hooks/loading';
import { useSettingStore, usePathStore, useGroupStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import type { PixivSetting } from '@/store/modules/setting/types';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import getFaceHttpUrl from '@/utils/url'

const saveWarning = ref(false);
const errorImgUrl = ref('');
const errorImgvisable = ref(false);
const { loading, setLoading } = useLoading();
const settingStore = useSettingStore();
const pathStore = usePathStore();
const groupStore = useGroupStore();
const formRef = ref();
const imgMentions = ref<SelectOptionData[]>([]);
const groupOptions = ref<SelectOptionData[]>([]);
const optionFontPaths = ref<string[]>([]);
const optionFacePaths = ref<string[]>([]);
const formModel = ref<PixivSetting>({});
const initModel = ref<PixivSetting>({});
const inputModel = reactive({
  prefixs: ''
});

const fromJson = computed(() => {
  return JSON.stringify(formModel.value);
})

const initJson = computed(() => {
  return JSON.stringify(initModel.value);
})

const onSubmit = async () => {
  try {
    const result = await formRef.value?.validate();
    if (result) {
      Message.error({ content: '数据有误，请重新检查', position: 'top' });
      return;
    }
    setLoading(true);
    await settingStore.savePixivSetting(formModel.value);
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

const searchFontPath = async () => {
  optionFontPaths.value = await pathStore.loadFontPaths();
}

const searchFacePath = async () => {
  optionFacePaths.value = await pathStore.loadFaceServerPaths();
}

const fetchGroups = async () => {
  try {
    groupOptions.value = await groupStore.loadGroupOptions();
  } catch (error) {
    console.log(error);
  }
};

const loadImgMentions = async () => {
  try {
    imgMentions.value = await pathStore.loadFaceMentions();
  } catch (error) {
    console.log(error);
  }
};

const fetchSettings = async () => {
  try {
    initModel.value = await settingStore.loadPixivSetting();
    formModel.value = { ...initModel.value };
    watch(fromJson, (newJson, oldJson) => {
      saveWarning.value = newJson !== initJson.value;
    }, { deep: true }
    )
  } catch (error) {
    console.log(error);
  }
};

fetchGroups();
fetchSettings();
loadImgMentions();
searchFontPath();
searchFacePath();
</script>

<script lang="ts">
export default {
  name: 'GeneralSetting',
};
</script>