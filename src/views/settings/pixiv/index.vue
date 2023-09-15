<template>
  <div class="container">
    <a-card class="general-card">
      <Breadcrumb :items="['menu.settings', 'menu.settings.pixiv']" />
      <a-form ref="formRef" layout="horizontal" :model="form">
          <a-row class="row">

              <a-form-item
                field="prefixs"
                :label="$t('settings.base.prefixs')"
                tooltip="指令前缀，Bot只会处理带有前缀的指令，如：(#菜单)"
                feedback >
                  <a-input v-model="form.prefixs" placeholder="输入一个或多个前缀，多个之间用逗号隔开" />
              </a-form-item>

              <a-form-item
                field="downloadPath"
                :label="$t('settings.base.downloadPath')"
                tooltip="下载临时文件存放路径"
                feedback >
                  <a-input v-model="form.downloadPath" placeholder="输入一个相对路径或者绝对路径" />
              </a-form-item>

              <a-form-item
                field="defaultFontPath"
                label="字体路径"
                tooltip="默认字体路径"
                feedback >
                  <a-input v-model="form.downloadPath" placeholder="输入一个相对路径或者绝对路径" />
              </a-form-item>

              <a-form-item
                field="clearCorn"
                label="定时清理"
                :rules="cornRules"
                tooltip="定时清理Corn表达式，详细可以百度Corn在线生成"
                feedback >
                  <a-input v-model="form.downloadPath" placeholder="输入一个Corn表达式" />
              </a-form-item>

               <a-form-item>
                  <a-button class="action" type="primary" :loading="loading" @click="onSubmitClick">{{ $t('button.submit') }}</a-button>
                  <a-button class="action">{{ $t('button.reset') }}</a-button>
               </a-form-item>
               
            </a-row>
          </a-form>
        </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import useLoading from '@/hooks/loading';

const { loading, setLoading } = useLoading();
const formRef = ref();
const form = reactive({
  prefixs: '',
  downloadPath: '',
  defaultFontPath: '',
  clearCorn: '',
})

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



</script>

<script lang="ts">
export default {
  name: 'BaseSettings',
};
</script>

<style scoped lang="less">
.container {
  padding: 20px;
  overflow: hidden;
}

.row {
  padding: 20px 0px 0px 0px;
  min-width: 650px;
  margin: 0 auto;
}

.action {
  margin-right: 10px;
}
</style>
