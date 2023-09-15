<template>
  <div class="container">
    <Breadcrumb :items="['menu.settings', 'menu.settings.base']" />
    <a-form ref="formRef" layout="horizontal" :model="form">
        <a-card class="general-card">
          <a-row class="row">
              <a-form-item
                field="prefixs"
                :label="$t('settings.base.prefixs')"
                :rules="prefixsRules"
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

               <a-form-item>
                  <a-button class="action" type="primary" :loading="loading" @click="onSubmitClick">{{ $t('button.submit') }}</a-button>
                  <a-button class="action">{{ $t('button.reset') }}</a-button>
               </a-form-item>
               
            </a-row>
        </a-card>
    </a-form>
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
})

const prefixsRules = [{
  validator: (value: string, callback: (error: string) => void) => {
    console.log('value:', value);
    if (value !== 'admin') {
      callback('name must be admin');
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
