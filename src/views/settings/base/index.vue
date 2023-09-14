<template>
  <div class="container">
    <Breadcrumb :items="['menu.settings', 'menu.settings.base']" />
    <a-form ref="formRef" layout="horizontal" :model="formData">
        <a-card class="general-card">
          <a-row class="row">

              <a-form-item
                field="prefixs"
                :label="$t('settings.base.prefixs')"
                help=""
                tooltip="指令前缀，Bot只会处理带有前缀的指令，如：(#菜单)"
                :validate-status="'success'"
                feedback >
                  <a-input placeholder="输入一个或多个前缀，多个之间用逗号隔开" />
              </a-form-item>

              <a-form-item
                field="downloadPath"
                :label="$t('settings.base.downloadPath')"
                help=""
                tooltip="下载临时文件存放路径"
                :validate-status="'success'"
                feedback >
                  <a-input placeholder="输入一个相对路径或者绝对路径" />
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
import { ref } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import useLoading from '@/hooks/loading';

const formData = ref({});
const formRef = ref<FormInstance>();
const { loading, setLoading } = useLoading();
const onSubmitClick = async () => {
  const res = await formRef.value?.validate();
  if (!res) {
    setLoading(true);
  }
  setTimeout(() => {
    setLoading(false);
  }, 1000);
};
</script>

<script lang="ts">
export default {
  name: 'Group',
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
