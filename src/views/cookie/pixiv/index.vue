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

:deep(.arco-textarea) {
  min-height: 250px;
}
</style>

<template>
  <a-spin class="spin" :loading="loading" tip="加载中..." :size="35">
    <div class="container">
      <a-form ref="formRef" layout="horizontal" size="large" :auto-label-width="true" :scroll-to-first-error="true" :model="formModel">
        <a-card class="card">
          <save-warning :initModel="initModel" :formModel="formModel" />
          <Breadcrumb :items="['menu.cookie', 'menu.cookie.pixiv']" />
          <a-form-item field="cookie" label="Cookie" tooltip="Pixiv Cookie，获取方式请参考文档" feedback>
            <a-textarea v-model:model-value="formModel.cookie" :auto-size="{ minRows: 50, maxRows: 10 }" placeholder="输入Cookie..." allow-clear />
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
  </a-spin>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useLoading from '@/hooks/loading';
import { getPixivCookie, setPixivCookie, CookieData } from '@/api/cookie';
import { Message } from '@arco-design/web-vue';

const formRef = ref();
const { loading, setLoading } = useLoading();
const formModel = ref<CookieData>({ cookie: '' });
const initModel = ref<CookieData>({ cookie: '' });

const onSubmit = async () => {
  try {
    const result = await formRef.value?.validate();
    if (result) {
      Message.error({ content: '数据有误，请重新检查', position: 'top' });
      return;
    }
    setLoading(true);
    await setPixivCookie(formModel.value.cookie);
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

const fetchCookie = async () => {
  try {
    setLoading(true);
    formModel.value = await getPixivCookie() as unknown as CookieData;
    initModel.value = JSON.parse(JSON.stringify(formModel.value))
  } catch (error) {
    console.log(error);
  }
  finally {
    setLoading(false);
  }
};

fetchCookie();
</script>

<script lang="ts">
export default {
  name: 'PixivCookie',
};
</script>