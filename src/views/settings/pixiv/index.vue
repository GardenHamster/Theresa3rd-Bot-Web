<template>
  <div class="container">
    <a-card class="card">
      <Breadcrumb :items="['menu.settings', 'menu.settings.general']" />
      <a-form ref="formRef" layout="horizontal" size="large" :auto-label-width="true" :model="form">

              <a-form-item
                field="clearCorn"
                label="定时清理"
                :rules="cornRules"
                tooltip="定时清理Corn表达式，详细可以百度Corn在线生成"
                feedback >
                  <a-input v-model="form.downloadPath" placeholder="输入一个Corn表达式" />
              </a-form-item>

               <a-form-item>
                  <a-space direction="horizontal" >
                    <a-button type="primary" :loading="loading" @click="onSubmitClick">{{ $t('button.submit') }}</a-button>
                    <a-button >{{ $t('button.reset') }}</a-button>
                  </a-space>
               </a-form-item>
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
  prefixs: [],
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
  name: 'PixivSetting',
};
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
