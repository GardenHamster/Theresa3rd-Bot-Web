<template>
  <div class="container">
    <a-card class="card">
      <Breadcrumb :items="['menu.settings', 'menu.settings.base']" />
      <a-form layout="horizontal" size="large" :auto-label-width="true" :model="param">
        <a-form-item field="prefixs" label="指令前缀" tooltip="指令前缀，Bot只会处理带有前缀的指令，如：(#菜单)，输入后按下回车添加，可同时设置多个前缀" feedback>
          <a-input-tag v-model:model-value="param.prefixs" v-model:input-value="form.prefixs" placeholder="输入后按下回车添加"
            allow-clear />
        </a-form-item>

        <a-form-item field="downloadPath" label="缓存目录" tooltip="下载图片等文件的临时存放目录" feedback>
          <a-input v-model:model-value="param.downloadPath" placeholder="输入一个相对路径或者绝对路径" />
        </a-form-item>

        <a-form-item field="defaultFontPath" label="字体路径" tooltip="默认字体路径" feedback>
          <a-auto-complete v-model:model-value="param.defaultFontPath" :data="optionFontPaths"
            placeholder="输入一个相对路径或者绝对路径" allow-clear @search="searchFontPath" />
        </a-form-item>

        <a-form-item field="clearCorn" label="定时清理" :rules="cornRules" tooltip="定时清理Corn表达式，详细可以百度Corn在线生成" feedback>
          <a-input v-model:model-value="param.clearCorn" placeholder="输入一个Corn表达式" />
        </a-form-item>

        <a-form-item field="errorGroups" label="日志群" tooltip="发生错误时会将日志发送到这些群" feedback>
          <a-select v-model:model-value="param.errorGroups" :options="groupOptions" placeholder="选择任意群" :scrollbar="true"
            allow-search multiple>
          </a-select>
        </a-form-item>

        <a-form-item field="downErrorImgPath" label="替代图片" tooltip="图片下载失败时，用于代替展示的图片" feedback>
          <a-space direction="vertical" :style="{ width: '100%' }" size="small">
            <a-auto-complete v-model:model-value="param.downErrorImgPath" :data="optionFacePaths"
              placeholder="输入一个相对路径或者绝对路径" allow-clear @search="searchFacePath" @change="showErrorImg" />
            <a-image width="100px" :src="errorImgUrl" v-show="errorImgvisable" />
          </a-space>
        </a-form-item>

        <a-form-item field="errorMsg" label="错误模板" tooltip="处理异常时返回的消息" extra="输入中括号[]可以快速插入图片" feedback>
          <a-mention v-model:model-value="param.errorMsg" :style="{ minHeight: '100px' }" :prefix="['[', ']', 'image']"
            :data="['[Bytedance]', 'Bytedesign', 'Bytenumner']" type="textarea" placeholder="enter something" auto-size
            allow-clear />
        </a-form-item>

        <a-form-item>
          <a-space direction="horizontal">
            <a-button type="primary" :loading="loading" @click="onSubmitClick">{{ $t('button.submit') }}</a-button>
            <a-button>{{ $t('button.restore') }}</a-button>
          </a-space>
        </a-form-item>

      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import useLoading from '@/hooks/loading';
import { usePathStore, useGroupStore } from '@/store';
import type { BaseSetting } from '@/api/settings';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import getFaceHttpUrl from '@/utils/url'

const errorImgUrl = ref('');
const errorImgvisable = ref(false);
const { loading, setLoading } = useLoading();
const pathStore = usePathStore();
const groupStore = useGroupStore();
const formRef = ref();
const groupOptions = ref<SelectOptionData[]>([]);
const optionFontPaths = ref<string[]>([]);
const optionFacePaths = ref<string[]>([]);
const param = reactive<BaseSetting>({
  prefixs: [],
  downloadPath: '',
  defaultFontPath: '',
  clearCorn: '',
  downErrorImgPath: '',
  errorGroups: [],
  errorMsg: '',
});

const form = reactive({
  prefixs: ''
});

const cornRules = [{
  validator: (value: string, callback: (error: string) => void) => {
    if (value === '') {
      callback('Corn格式不正确');
    }
  }
}];

const onSubmitClick = async () => {
  const res = await formRef.value?.validate();
  if (!res) setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
};

const searchFontPath = async () => {
  optionFontPaths.value = await pathStore.loadFontPaths();
}

const searchFacePath = async () => {
  optionFacePaths.value = await pathStore.loadFaceServerPaths();
}

const showErrorImg = async () => {
  const serverPath = param.downErrorImgPath.trim();
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

fetchGroups();
searchFontPath();
searchFacePath();
showErrorImg();

</script>


<style scoped lang="less">
.arco-layout .container {
  padding: 20px 0px 0px 20px;
  overflow: hidden;
}

.arco-layout.mobile .container {
  padding: 0px;
  overflow: hidden;
}

.card {
  min-width: 300px;
}
</style>
