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
          <Breadcrumb :items="['menu.settings', 'menu.settings.timingsetu']" />

          <a-form-item field="enable" label="启用功能" tooltip="是否启用该功能" :style="{ marginBottom: '0px' }" feedback>
            <a-switch v-model:model-value="formModel.enable">
              <template #checked>ON</template>
              <template #unchecked>OFF</template>
            </a-switch>
          </a-form-item>
        </a-card>

        <a-card class="card" title="本地图源配置">
          <a-form-item field="fromOneDir" label="同一类型" tooltip="从同一个目录中读取涩图，否则从不同的文件夹中读取" :disabled="!formModel?.enable" feedback>
            <a-switch v-model:model-value="formModel.fromOneDir">
              <template #checked>ON</template>
              <template #unchecked>OFF</template>
            </a-switch>
          </a-form-item>
          <a-form-item field="localPath" label="图片目录" tooltip="本地涩图的存放目录" :disabled="!formModel?.enable" :style="{ marginBottom: '0px' }" feedback>
            <a-input v-model:model-value="formModel.localPath" placeholder="输入一个相对路径或者绝对路径" allow-clear />
          </a-form-item>
        </a-card>

        <a-card class="card" title="Lolisuki图源配置">
          <a-form-item label="级别范围" tooltip="Lolisuki Api中的Level，Source为2时可用，值越大表示越涩，最小为0，最大为6，0~4为非R18，5~6为R18" :style="{ marginBottom: '0px' }" :disabled="!formModel?.enable" feedback>
            <a-space direction="horizontal">
              <a-input-number v-model:model-value="minLevel" :style="{ maxWidth: '80px' }" :min="0" :max="6" placeholder="输入一个数字" mode="embed" size="large">
              </a-input-number>
              -
              <a-input-number v-model:model-value="maxLevel" :style="{ maxWidth: '80px' }" :min="0" :max="6" placeholder="输入一个数字" mode="embed" size="large">
              </a-input-number>
            </a-space>
          </a-form-item>
        </a-card>

        <a-card class="card" v-for="(item, index) of formModel.timers" :key="index" :title="`定时任务${padLeft((index + 1).toString(), (0).toString(), 2)}`">
          <template #extra>
            <a-popconfirm @ok="onDeleteCard(index)" content="确定要删除这个定时任务吗？" type="warning" position="br">
              <span class="delCard">删除</span>
            </a-popconfirm>
          </template>

          <a-form-item :field="`timers[${index}].enable`" label="是否启用" tooltip="是否启用这个定时任务" :disabled="!formModel.enable" feedback>
            <a-switch v-model:model-value="item.enable">
              <template #checked>ON</template>
              <template #unchecked>OFF</template>
            </a-switch>
          </a-form-item>

          <a-form-item :field="`timers[${index}].sendMerge`" label="合并发送" tooltip="使用合并方式推送，并且以每次5条的方式推送" :disabled="!formModel.enable || !item.enable" feedback>
            <a-switch v-model:model-value="item.sendMerge">
              <template #checked>ON</template>
              <template #unchecked>OFF</template>
            </a-switch>
          </a-form-item>

          <a-form-item :field="`timers[${index}].atAll`" label="艾特全体" tooltip="是否艾特全体" :disabled="!formModel.enable || !item.enable" feedback>
            <a-switch v-model:model-value="item.atAll">
              <template #checked>ON</template>
              <template #unchecked>OFF</template>
            </a-switch>
          </a-form-item>

          <a-form-item :field="`timers[${index}].quantity`" label="推送数量" tooltip="推送涩图数量" :disabled="!formModel.enable || !item.enable" :rules="[{ required: true, message: '必须输入一个数量' }]" feedback>
            <a-input-number v-model:model-value="item.quantity" :style="{ maxWidth: '300px' }" :min="1" :max="20" placeholder="输入一个数字" mode="button" size="large">
              <template #suffix>张</template>
            </a-input-number>
          </a-form-item>

          <a-form-item :field="`timers[${index}].name`" label="任务名" tooltip="定时器名称" :disabled="!formModel.enable || !item.enable" :rules="[{ required: true, message: '必须输入一个名称' }]" feedback>
            <a-input v-model:model-value="item.name" placeholder="输入一个名称" allow-clear />
          </a-form-item>

          <a-form-item :field="`timers[${index}].cron`" label="Cron" tooltip="定时器Cron表达式，详细可以百度Cron在线生成" :disabled="!formModel.enable || !item.enable"
            :rules="[{ ...cronRule }, { required: true, message: '必须输入一个Cron表达式' }]" feedback>
            <a-input v-model:model-value="item.cron" placeholder="输入一个Cron表达式" allow-clear />
          </a-form-item>

          <a-form-item :field="`timers[${index}].source`" label="图片来源" tooltip="图片来源" :disabled="!formModel.enable || !item.enable" :rules="[{ required: true, message: '必须选择一个来源' }]" feedback>
            <a-select v-model:model-value="item.source" :options="sourceOptions" placeholder="选择一个图源" :scrollbar="true"></a-select>
          </a-form-item>

          <a-form-item :field="`timers[${index}].groups`" label="指定群" tooltip="指定需要推送的群" :disabled="!formModel.enable || !item.enable" :rules="[{ required: true, message: '至少选择一个群' }]" feedback>
            <group-select v-model:model-value="item.groups" :options="groupOptions" select-all />
          </a-form-item>

          <a-form-item :field="`timers[${index}].tags`" label="指定标签" tooltip="指定需要推送的标签内容，不填表示随机" extra="输入一个指令后按下Enter添加" :disabled="!formModel.enable || !item.enable" feedback>
            <a-input-tag v-model:model-value="item.tags" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
          </a-form-item>

          <a-form-item :field="`timers[${index}].timingMsg`" label="消息模板" tooltip="涩图消息推送模板" extra="输入“{”可以快速插入占位符" :disabled="!formModel.enable || !item.enable" feedback>
            <a-mention v-model:model-value="item.timingMsg" :style="{ minHeight: '120px' }" :prefix="['{']" :data="placeholders" type="textarea" placeholder="随便写点什么吧..." auto-size allow-clear />
          </a-form-item>
        </a-card>

        <a-card class="card addCard" size="small" :body-style="{ padding: '0px', height: '100%' }" @click="onCreateCard">
          <p class="addTemp"><icon-plus-circle-fill />点击添加一个定时任务</p>
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
import { ref, watch } from 'vue';
import { padLeft } from '@/utils/string';
import useLoading from '@/hooks/loading';
import { useSettingStore, usePathStore, useGroupStore, useOptionStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import { FacePath } from '@/store/modules/path/types';
import { cronRule } from '@/utils/validator'
import type { TimingSetuSetting } from '@/store/modules/setting/types';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';

const formRef = ref();
const { loading, setLoading } = useLoading();
const settingStore = useSettingStore();
const groupStore = useGroupStore();
const pathStore = usePathStore();
const optionStore = useOptionStore();
const facePaths = ref<FacePath[]>([]);
const sourceOptions = ref<SelectOptionData[]>([]);
const groupOptions = ref<SelectOptionData[]>([]);
const formModel = ref<TimingSetuSetting>({});
const initModel = ref<TimingSetuSetting>({});
const minLevel = ref<number>(0);
const maxLevel = ref<number>(0);

const placeholders = ref<SelectOptionData[]>([
  { label: '{Tags}:标签', value: 'Tags}' },
  { label: '{SourceName}:图片来源', value: 'SourceName}' },
]);

const onSubmit = async () => {
  try {
    const result = await formRef.value?.validate();
    if (result) {
      Message.error({ content: '数据有误，请重新检查', position: 'top' });
      return;
    }
    setLoading(true);
    await settingStore.saveTimingSetuSetting(formModel.value);
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

const onCreateCard = async () => {
  formModel.value.timers?.push({});
}

const onDeleteCard = async (index: number) => {
  formModel.value.timers?.splice(index, 1)
}

const fetchFaces = async () => {
  try {
    facePaths.value = await pathStore.loadFacePaths();
  } catch (error) {
    console.log(error);
  }
};

const fetchSourceOptions = async () => {
  try {
    sourceOptions.value = await optionStore.loadSetuSourceOptions();
  } catch (error) {
    console.log(error);
  }
};

const fetchGroups = async () => {
  try {
    groupOptions.value = await groupStore.getGroupOptions();
  } catch (error) {
    console.log(error);
  }
};

const fetchSettings = async () => {
  try {
    setLoading(true);
    formModel.value = await settingStore.loadTimingSetuSetting();
    initModel.value = JSON.parse(JSON.stringify(formModel.value))
    const lolisukiLevel = formModel.value?.lolisukiLevel ?? '';
    const levelArr = lolisukiLevel.trim().split('-');
    const minValue = levelArr.length > 0 ? Number(levelArr[0].trim()) : 0;
    const maxValue = levelArr.length > 1 ? Number(levelArr[1].trim()) : 0;
    minLevel.value = Math.min(minValue, maxValue);
    maxLevel.value = Math.max(minValue, maxValue);
  } catch (error) {
    console.log(error);
  }
  finally {
    setLoading(false);
  }
};

watch([minLevel, maxLevel], ([newMinLevel, newMaxLevel], [oldMinLevel, oldMaxLevel]) => {
  const minValue = Math.min(newMinLevel, newMaxLevel);
  const maxValue = Math.max(newMinLevel, newMaxLevel);
  formModel.value!.lolisukiLevel = `${minValue}-${maxValue}`
}
)

fetchFaces();
fetchGroups();
fetchSourceOptions();
fetchSettings();
</script>

<script lang="ts">
export default {
  name: 'TimingSetuSetting',
};
</script>