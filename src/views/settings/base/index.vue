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
          <a-auto-complete :data="optionFontPaths" @search="searchFontPath" v-model:model-value="param.defaultFontPath"
            placeholder="输入一个相对路径或者绝对路径" allow-clear />
        </a-form-item>

        <a-form-item field="clearCorn" label="定时清理" :rules="cornRules" tooltip="定时清理Corn表达式，详细可以百度Corn在线生成" feedback>
          <a-input v-model:model-value="param.clearCorn" placeholder="输入一个Corn表达式" />
        </a-form-item>

        <a-form-item field="downErrorImgPath" label="替代图片" tooltip="图片下载失败时，用于代替展示的图片" feedback>
          <a-auto-complete :data="optionFacePaths" @search="searchFacePath" v-model:model-value="param.downErrorImgPath"
            placeholder="输入一个相对路径或者绝对路径" allow-clear />
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
import { usePathStore } from '@/store';
import type { BaseSetting } from '@/api/settings';

const { loading, setLoading } = useLoading();
const pathStore = usePathStore();
const formRef = ref();
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
    console.log('value:', value);
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
  optionFacePaths.value = await pathStore.loadFacePaths();
}

searchFontPath();
searchFacePath();

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
