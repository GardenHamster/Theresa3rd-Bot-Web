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

.card:not(:first-child) {
  margin-top: 10px;
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

.addCard {
  border: 1px dashed rgb(var(--primary-6));
  text-align: center;
  cursor: pointer;
}

.addTemp {
  font-size: 16px;
  color: rgb(var(--primary-6));
}

.delCard {
  cursor: pointer;
  padding: 10px;
}
</style>

<template>
  <a-spin class="spin" :loading="loading" tip="加载中..." :size="35">
    <div class="container">
      <a-form ref="formRef" layout="horizontal" size="large" :auto-label-width="true" :scroll-to-first-error="true" :model="formModel">
        <a-card class="card">
          <save-warning :initModel="initModel" :formModel="formModel" />
          <Breadcrumb :items="['menu.collection', 'menu.collection.setting']" />
        </a-card>

        <a-card class="card" title="功能配置">
          <a-form-item field="enable" label="启用功能" tooltip="是否启用该功能" feedback>
            <a-switch v-model:model-value="formModel.enable">
              <template #checked>ON</template>
              <template #unchecked>OFF</template>
            </a-switch>
          </a-form-item>
          <a-form-item field="commands" label="收藏指令" tooltip="收藏指令" extra="输入一个指令后按下Enter添加" :disabled="!formModel.enable" feedback>
            <a-input-tag v-model:model-value="formModel.commands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
          </a-form-item>
        </a-card>

        <a-card class="card" title="Pixiv收藏">
          <a-form-item field="pixivCollect" label="启用" tooltip="添加到Pixiv用户收藏" :disabled="!formModel.enable" feedback>
            <a-switch v-model:model-value="formModel.pixivCollect">
              <template #checked>ON</template>
              <template #unchecked>OFF</template>
            </a-switch>
          </a-form-item>
        </a-card>

        <a-card class="card" title="本地收藏">
          <a-form-item field="localCollect" label="启用" tooltip="将收藏原图保存到本地磁盘" :disabled="!formModel.enable" feedback>
            <a-switch v-model:model-value="formModel.localCollect">
              <template #checked>ON</template>
              <template #unchecked>OFF</template>
            </a-switch>
          </a-form-item>
          <a-form-item field="localSavePath" label="本地目录" tooltip="收藏原图的本地保存路径" :disabled="!formModel.enable || !formModel.localCollect" feedback>
            <a-input v-model:model-value="formModel.localSavePath" placeholder="输入一个相对路径或者绝对路径" allow-clear />
          </a-form-item>
        </a-card>

        <a-card class="card" title="OSS收藏">
          <a-form-item field="ossCollect" label="启用" tooltip="将收藏原图保存到OSS" :disabled="!formModel.enable" feedback>
            <a-switch v-model:model-value="formModel.ossCollect">
              <template #checked>ON</template>
              <template #unchecked>OFF</template>
            </a-switch>
          </a-form-item>
          <a-form-item field="ossEndpoint" label="Endpoint" tooltip="OSSEndpoint，获取方法请参考文档" :disabled="!formModel.enable || !formModel.ossCollect" feedback>
            <a-input v-model:model-value="formModel.ossEndpoint" placeholder="输入OssEndpoint" allow-clear />
          </a-form-item>
          <a-form-item field="ossAccessKeyId" label="AccessKeyId" tooltip="OSSAccessKeyId，获取方法请参考文档" :disabled="!formModel.enable || !formModel.ossCollect" feedback>
            <a-input v-model:model-value="formModel.ossAccessKeyId" placeholder="输入OssAccessKeyId" allow-clear />
          </a-form-item>
          <a-form-item field="ossAccessKeySecret" label="AccessSecret" tooltip="OSSAccessKeySecret，获取方法请参考文档" :disabled="!formModel.enable || !formModel.ossCollect" feedback>
            <a-input v-model:model-value="formModel.ossAccessKeySecret" placeholder="输入OSSAccessKeySecret" allow-clear />
          </a-form-item>
          <a-form-item field="ossBucketName" label="BucketName" tooltip="OSSBucketName，获取方法请参考文档" :disabled="!formModel.enable || !formModel.ossCollect" feedback>
            <a-input v-model:model-value="formModel.ossBucketName" placeholder="输入OSSBucketName" allow-clear />
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
import { useSettingStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import type { CollectionSetting } from '@/store/modules/setting/types';

const formRef = ref();
const { loading, setLoading } = useLoading();
const settingStore = useSettingStore();
const formModel = ref<CollectionSetting>({});
const initModel = ref<CollectionSetting>({});

const onSubmit = async () => {
  try {
    const result = await formRef.value?.validate();
    if (result) {
      Message.error({ content: '数据有误，请重新检查', position: 'top' });
      return;
    }
    setLoading(true);
    await settingStore.saveCollectionSetting(formModel.value);
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

const fetchSettings = async () => {
  try {
    setLoading(true);
    formModel.value = await settingStore.loadCollectionSetting();
    initModel.value = JSON.parse(JSON.stringify(formModel.value))
  } catch (error) {
    console.log(error);
  }
  finally {
    setLoading(false);
  }
};

fetchSettings();
</script>

<script lang="ts">
export default {
  name: 'CollectionSettings',
};
</script>