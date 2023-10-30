<style scoped lang="less">
.container {
  height: 100%;
  margin-bottom: 50px;
  overflow: auto;
}

.card {
  padding-bottom: 25px;
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
</style>

<template>
  <div class="container">
    <a-form ref="formRef" layout="horizontal" size="large" :auto-label-width="true" :scroll-to-first-error="true"
      :model="formModel">
      <a-card class="card">

        <save-warning :initModel="initModel" :formModel="formModel" />

        <Breadcrumb :items="['menu.settings', 'menu.settings.saucenao']" />

        <a-form-item field="enable" label="是否启用" tooltip="是否启用该功能" feedback>
          <a-switch v-model:model-value="formModel.enable">
            <template #checked>ON</template>
            <template #unchecked>OFF</template>
          </a-switch>
        </a-form-item>

        <a-form-item field="commands" label="指令" tooltip="菜单指令" extra="输入一个指令后按下Enter添加" :disabled="!formModel.enable"
          feedback>
          <a-input-tag v-model:model-value="formModel.commands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加"
            allow-clear />
        </a-form-item>

        <a-form-item field="notFoundMsg" label="无结果提示" tooltip="找不到原图时返回的消息" extra="输入“[”可以快速插入图片码"
          :disabled="!formModel.enable" feedback>
          <preview-textarea v-model:model-value="formModel.notFoundMsg" :facePaths="facePaths"
            placeholder="模版为空时将使用自动生成" />
        </a-form-item>

        <a-form-item field="processingMsg" label="执行提示" tooltip="开始查找前返回的消息" extra="输入“[”可以快速插入图片码"
          :disabled="!formModel.enable" feedback>
          <preview-textarea v-model:model-value="formModel.processingMsg" :facePaths="facePaths"
            placeholder="模版为空时将使用自动生成" />
        </a-form-item>

        <a-form-item field="template" label="消息模版" tooltip="搜索结果消息模板" extra="输入“[”可以快速插入图片码" :disabled="!formModel.enable"
          feedback>
          <preview-textarea v-model:model-value="formModel.template" :facePaths="facePaths" placeholder="模版为空时将使用自动生成" />
        </a-form-item>

        <a-form-item field="memberCD" label="独立CD" tooltip="独立CD(秒)，单个群员使用命令后需要等待的CD" feedback>
          <a-input-number v-model:model-value="formModel.memberCD" :style="{ maxWidth: '300px' }" :min="0" :max="99"
            placeholder="输入一个数字" mode="button" size="large" />
        </a-form-item>

        <a-form-item field="maxDaily" label="次数限制" tooltip="每人每日最大使用次数，0表示无限制" feedback>
          <a-input-number v-model:model-value="formModel.maxDaily" :style="{ maxWidth: '300px' }" :min="0" :max="99"
            placeholder="输入一个数字" mode="button" size="large" />
        </a-form-item>

        <a-form-item field="maxReceive" label="图片接收" tooltip="每次最多接收并查询多少张图片，0表示无限制" feedback>
          <a-input-number v-model:model-value="formModel.maxReceive" :style="{ maxWidth: '300px' }" :min="0" :max="99"
            placeholder="输入一个数字" mode="button" size="large" />
        </a-form-item>

        <a-form-item field="minSimilarity" label="最低相似度" tooltip="最低相似度(%)" feedback>
          <a-input-number v-model:model-value="formModel.minSimilarity" :style="{ maxWidth: '300px' }" :min="0" :max="99"
            placeholder="输入一个数字" mode="button" size="large" />
        </a-form-item>

        <a-form-item field="saucenaoReadCount" label="读取数量" tooltip="最多读取前N个Saucenao中的匹配结果" feedback>
          <a-input-number v-model:model-value="formModel.saucenaoReadCount" :style="{ maxWidth: '300px' }" :min="0"
            :max="99" placeholder="输入一个数字" mode="button" size="large" />
        </a-form-item>

        <a-form-item field="pixivPriority" label="Pixiv优先比" tooltip="优先返回相似度高于该值的Pixiv中的结果，范围0~100(%)" feedback>
          <a-input-number v-model:model-value="formModel.pixivPriority" :style="{ maxWidth: '300px' }" :min="0" :max="99"
            placeholder="输入一个数字" mode="button" size="large" />
        </a-form-item>

        <a-form-item field="singlePriority" label="唯一优先比" tooltip="相似度高于该值时，只返回第一个匹配度最高的结果，范围0~100(%)" feedback>
          <a-input-number v-model:model-value="formModel.singlePriority" :style="{ maxWidth: '300px' }" :min="0" :max="99"
            placeholder="输入一个数字" mode="button" size="large" />
        </a-form-item>

        <a-form-item field="imagePriority" label="图片显示比" tooltip="相似度高于该值时，才显示图片，范围0~100(%)" feedback>
          <a-input-number v-model:model-value="formModel.imagePriority" :style="{ maxWidth: '300px' }" :min="0" :max="99"
            placeholder="输入一个数字" mode="button" size="large" />
        </a-form-item>

        <a-form-item field="pullOrigin" label="拉取详情" tooltip="尝试从源网站中获取图片和详细信息" feedback>
          <a-switch v-model:model-value="formModel.pullOrigin">
            <template #checked>ON</template>
            <template #unchecked>OFF</template>
          </a-switch>
        </a-form-item>

        <a-form-item field="sendPrivate" label="同时私聊结果" tooltip="同时私聊发送结果" feedback>
          <a-switch v-model:model-value="formModel.sendPrivate">
            <template #checked>ON</template>
            <template #unchecked>OFF</template>
          </a-switch>
        </a-form-item>

        <a-form-item field="revokeInterval" label="撤回时间" tooltip="N秒后撤回，0表示不撤回" feedback>
          <a-input-number v-model:model-value="formModel.revokeInterval" :style="{ maxWidth: '300px' }" :min="0" :max="99"
            placeholder="输入一个数字" mode="button" size="large" />
        </a-form-item>

        <a-form-item field="revokeSearched" label="撤回搜索" tooltip="是否撤回被查找的图片" feedback>
          <a-switch v-model:model-value="formModel.revokeSearched">
            <template #checked>ON</template>
            <template #unchecked>OFF</template>
          </a-switch>
        </a-form-item>

        <a-form-item field="continueAscii2d" label="二次搜索" tooltip="Saucenao没有匹配结果时是否继续使用Ascii2d搜索，true：是，false：否"
          feedback>
          <a-switch v-model:model-value="formModel.continueAscii2d">
            <template #checked>ON</template>
            <template #unchecked>OFF</template>
          </a-switch>
        </a-form-item>

        <a-form-item field="ascii2dWithIp" label="Ip请求" tooltip="使用IP请求Ascii2d，遇到403等错误时可以尝试将该值改为true" feedback>
          <a-switch v-model:model-value="formModel.ascii2dWithIp">
            <template #checked>ON</template>
            <template #unchecked>OFF</template>
          </a-switch>
        </a-form-item>

        <a-form-item field="ascii2dReadCount" label="读取数量" tooltip="从Ascii2d的搜索结果中读取前N条，0表示无限制" feedback>
          <a-input-number v-model:model-value="formModel.ascii2dReadCount" :style="{ maxWidth: '300px' }" :min="0"
            :max="99" placeholder="输入一个数字" mode="button" size="large" />
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
import { ref } from 'vue';
import useLoading from '@/hooks/loading';
import { useSettingStore, usePathStore, useGroupStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import { FacePath } from '@/store/modules/path/types';
import type { SaucenaoSetting } from '@/store/modules/setting/types';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';

const formRef = ref();
const { loading, setLoading } = useLoading();
const settingStore = useSettingStore();
const groupStore = useGroupStore();
const pathStore = usePathStore();
const facePaths = ref<FacePath[]>([]);
const groupOptions = ref<SelectOptionData[]>([]);
const formModel = ref<SaucenaoSetting>({});
const initModel = ref<SaucenaoSetting>({});

const onSubmit = async () => {
  try {
    const result = await formRef.value?.validate();
    if (result) {
      Message.error({ content: '数据有误，请重新检查', position: 'top' });
      return;
    }
    setLoading(true);
    await settingStore.saveSaucenaoSetting(formModel.value);
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

const fetchFaces = async () => {
  try {
    facePaths.value = await pathStore.loadFacePaths();
  } catch (error) {
    console.log(error);
  }
};

const fetchGroups = async () => {
  try {
    groupOptions.value = await groupStore.loadGroupOptions();
  } catch (error) {
    console.log(error);
  }
};

const fetchSettings = async () => {
  try {
    formModel.value = await settingStore.loadSaucenaoSetting();
    initModel.value = JSON.parse(JSON.stringify(formModel.value))
  } catch (error) {
    console.log(error);
  }
};

fetchFaces();
fetchGroups();
fetchSettings();
</script>

<script lang="ts">
export default {
  name: 'SaucenaoSetting',
};
</script>