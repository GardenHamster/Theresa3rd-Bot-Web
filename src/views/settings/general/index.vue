<template>
  <div class="container">
    <a-card class="card">

      <a-alert type="warning" v-show="saveWarning" center>某些属性值已经被修改，但是还未进行保存</a-alert>

      <Breadcrumb :items="['menu.settings', 'menu.settings.general']" />

      <a-form ref="formRef" layout="horizontal" size="large" :auto-label-width="true" :model="formModel">
        <a-form-item field="prefixs" label="指令前缀" tooltip="指令前缀，Bot只会处理带有前缀的指令，如：(#菜单)，你也可以不设置任何前缀。输入后按下回车添加，可同时设置多个前缀" feedback>
          <a-input-tag v-model:model-value="formModel.prefixs" v-model:input-value="inputModel.prefixs" placeholder="输入后按下回车添加"
            allow-clear />
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
          <a-auto-complete v-model:model-value="formModel.fontPath" :data="optionFontPaths"
            placeholder="输入一个相对路径或者绝对路径" allow-clear @search="searchFontPath" />
        </a-form-item>

        <a-form-item field="clearCron" label="定时清理" :rules="cronRules" tooltip="定时清理Cron表达式，详细可以百度Cron在线生成" feedback>
          <a-input v-model:model-value="formModel.clearCron" placeholder="输入一个Cron表达式" allow-clear />
        </a-form-item>

        <a-form-item field="errorGroups" label="日志群" tooltip="发生错误时会将日志发送到这些群" feedback>
          <a-select v-model:model-value="formModel.errorGroups" :options="groupOptions" placeholder="选择任意群" :scrollbar="true"
            allow-search allow-clear multiple>
          </a-select>
        </a-form-item>

        <a-form-item field="errorImgPath" label="替代图片" tooltip="图片下载失败时，用于代替展示的图片" feedback>
          <a-space direction="vertical" :style="{ width: '100%' }" size="small">
            <a-auto-complete v-model:model-value="formModel.errorImgPath" :data="optionFacePaths"
              placeholder="输入一个相对路径或者绝对路径" allow-clear @search="searchFacePath" @change="showErrorImg" />
            <a-image width="100px" :src="errorImgUrl" v-show="errorImgvisable" />
          </a-space>
        </a-form-item>

        <a-form-item field="errorMsg" label="错误提示" tooltip="处理异常时返回的消息" feedback>
          <a-mention v-model:model-value="formModel.errorMsg" :style="{ minHeight: '100px' }" :prefix="['[']"
            :data="imgMentions" type="textarea" placeholder="输入“[”可以快速插入图片码" auto-size allow-clear />
        </a-form-item>

        <a-form-item field="disableMsg" label="禁用提示" tooltip="发送某个指令但是被禁用时返回的消息" feedback>
          <a-mention v-model:model-value="formModel.disableMsg" :style="{ minHeight: '100px' }" :prefix="['[']"
            :data="imgMentions" type="textarea" placeholder="输入“[”可以快速插入图片码" auto-size allow-clear />
        </a-form-item>

        <a-form-item field="noPermissionsMsg" label="无权限提示" tooltip="发送某个指令但是缺少使用权限时时返回的消息" feedback>
          <a-mention v-model:model-value="formModel.noPermissionsMsg" :style="{ minHeight: '100px' }" :prefix="['[']"
            :data="imgMentions" type="textarea" placeholder="输入“[”可以快速插入图片码" auto-size allow-clear />
        </a-form-item>

        <a-form-item field="managersRequiredMsg" label="非管理员提示" tooltip="发送某个指令但是缺少管理员权限时返回的消息" feedback>
          <a-mention v-model:model-value="formModel.managersRequiredMsg" :style="{ minHeight: '100px' }" :prefix="['[']"
            :data="imgMentions" type="textarea" placeholder="输入“[”可以快速插入图片码" auto-size allow-clear />
        </a-form-item>

        <a-form-item field="setuCustomDisableMsg" label="涩图禁用提示" tooltip="涩图功能被禁用时返回的消息" feedback>
          <a-mention v-model:model-value="formModel.setuCustomDisableMsg" :style="{ minHeight: '100px' }" :prefix="['[']"
            :data="imgMentions" type="textarea" placeholder="输入“[”可以快速插入图片码" auto-size allow-clear />
        </a-form-item>

        <a-form-item field="errorMsg" label="错误提示" tooltip="处理异常时返回的消息" feedback>
          <a-space direction="vertical" :style="{ width: '100%' }" size="mini">
            <a-mention v-model:model-value="formModel.errorMsg" :style="{ minHeight: '100px', marginBottom: '0px' }" :prefix="['[']"
            :data="imgMentions" type="textarea" placeholder="输入“[”可以快速插入图片码" auto-size allow-clear />
            <a-comment :align="'right'" class="preview">
              <template #avatar>
                <a-avatar>
                  <img alt="avatar" :src="avatarImg" />
                </a-avatar>
              </template>
              <template #content>
                <div>
                  <p class="bubble">
                    出了点小问题，稍后再试吧
                  </p>
                  <p class="bubble">
                    <a-image width="200" src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp" />
                  </p>
                </div>
              </template>
            </a-comment>
          </a-space>
        </a-form-item>

        <a-form-item>
          <a-space direction="horizontal">
            <a-button type="primary" :loading="loading" @click="onSubmit">{{ $t('button.submit') }}</a-button>
            <a-button @click="onReset">{{ $t('button.reset') }}</a-button>
          </a-space>
        </a-form-item>

      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import useLoading from '@/hooks/loading';
import { useSettingStore, usePathStore, useGroupStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import type { GeneralSetting } from '@/store/modules/setting/types';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import avatarImg from '@/assets/images/avatar.jpg';
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
const formModel = ref<GeneralSetting>({});
const initModel = ref<GeneralSetting>({});
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
    if (result) return;
    setLoading(true);
    await settingStore.saveGeneralSetting(formModel.value);
    Message.success('保存成功');
  } catch (error) {
    console.log(error);
    Message.error('保存失败');
  }
  finally {
    setLoading(false);
  }
};

const onReset = async () => {
  try {
    setLoading(true);
    formModel.value = { ...initModel.value };
    Message.info({ content: '重置完毕', position: 'bottom' });
  } catch (error) {
    console.log(error);
  }
  finally {
    setLoading(false);
  }
};

const cronRules = [{
  validator: (value: string, callback: (error: string) => void) => {
    if (value === '') {
      callback('cron格式不正确');
    }
  }
}];

const searchFontPath = async () => {
  optionFontPaths.value = await pathStore.loadFontPaths();
}

const searchFacePath = async () => {
  optionFacePaths.value = await pathStore.loadFaceServerPaths();
}

const showErrorImg = async () => {
  const serverPath = formModel.value.errorImgPath?.trim() ?? '';
  errorImgvisable.value = serverPath.length > 0;
  if (serverPath.length === 0) return;
  const httpPath = await pathStore.getFaceHttpPath(serverPath);
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

const loadImgMentions = async () => {
  try {
    imgMentions.value = await pathStore.loadFaceMentions();
  } catch (error) {
    console.log(error);
  }
};

const fetchSettings = async () => {
  try {
    initModel.value = await settingStore.loadGeneralSetting();
    formModel.value = { ...initModel.value };
    watch(fromJson, (newJson, oldJson) => {
      saveWarning.value = newJson !== initJson.value;
    }, { deep: true }
    )
    await showErrorImg();
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


<style scoped lang="less">
.card {
  min-width: 300px;
}

.bubble {
  background-color: pink;
  border-radius: 5px;
  padding: 5px;
}
</style>
