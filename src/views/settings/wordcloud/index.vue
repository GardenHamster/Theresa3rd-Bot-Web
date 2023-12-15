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
          <Breadcrumb :items="['menu.settings', 'menu.settings.wordcloud']" />

          <a-form-item field="enable" label="启用功能" tooltip="是否启用该功能" :style="{ marginBottom: '0px' }" feedback>
            <a-switch v-model:model-value="formModel.enable">
              <template #checked>ON</template>
              <template #unchecked>OFF</template>
            </a-switch>
          </a-form-item>
        </a-card>

        <a-card class="card" title="功能配置">

          <a-form-item field="groupCD" label="共享CD" tooltip="群共享CD，使用指令后全群需要CD才能重新使用该功能" :disabled="!formModel!.enable" feedback>
            <a-input-number v-model:model-value="formModel.groupCD" :style="{ maxWidth: '300px' }" :min="0" :max="100000" placeholder="输入一个数字" mode="button" size="large">
              <template #suffix>秒</template>
            </a-input-number>
          </a-form-item>

          <a-form-item field="maxWords" label="词汇数量" tooltip="出现在词云中的最大词汇数量" :disabled="!formModel!.enable" feedback>
            <a-input-number v-model:model-value="formModel.maxWords" :style="{ maxWidth: '300px' }" :min="0" :max="1000" placeholder="输入一个数字" mode="button" size="large">
              <template #suffix>个</template>
            </a-input-number>
          </a-form-item>

          <a-form-item field="defaultWidth" label="默认宽度" tooltip="矩形词云默认的宽度" :disabled="!formModel!.enable" feedback>
            <a-input-number v-model:model-value="formModel.defaultWidth" :style="{ maxWidth: '300px' }" :min="0" :max="2000" placeholder="输入一个数字" mode="button" size="large">
              <template #suffix>像素</template>
            </a-input-number>
          </a-form-item>

          <a-form-item field="defaultHeight" label="默认高度" tooltip="矩形词云默认的高度" :disabled="!formModel!.enable" feedback>
            <a-input-number v-model:model-value="formModel.defaultHeight" :style="{ maxWidth: '300px' }" :min="0" :max="2000" placeholder="输入一个数字" mode="button" size="large">
              <template #suffix>像素</template>
            </a-input-number>
          </a-form-item>

          <a-form-item field="fontPath" label="字体路径" tooltip="指定绘制词云的字体路径" feedback>
            <a-auto-complete v-model:model-value="formModel.fontPath" :data="fontOptions" placeholder="输入一个相对路径或者绝对路径" allow-clear />
          </a-form-item>

          <a-form-item field="basicCommands" label="范围指令" tooltip="自定义范围词云命令，未指定范围是默认获取24小时内的词云" extra="输入一个指令后按下Enter添加" :disabled="!formModel.enable" feedback>
            <a-input-tag v-model:model-value="formModel.basicCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
          </a-form-item>

          <a-form-item field="dailyCommands" label="本日指令" tooltip="本日词云命令" extra="输入一个指令后按下Enter添加" :disabled="!formModel.enable" feedback>
            <a-input-tag v-model:model-value="formModel.dailyCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
          </a-form-item>

          <a-form-item field="weeklyCommands" label="本周指令" tooltip="本周词云命令" extra="输入一个指令后按下Enter添加" :disabled="!formModel.enable" feedback>
            <a-input-tag v-model:model-value="formModel.weeklyCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
          </a-form-item>

          <a-form-item field="monthlyCommands" label="本月指令" tooltip="本月词云命令" extra="输入一个指令后按下Enter添加" :disabled="!formModel.enable" feedback>
            <a-input-tag v-model:model-value="formModel.monthlyCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
          </a-form-item>

          <a-form-item field="yearlyCommands" label="本年指令" tooltip="本年词云命令" extra="输入一个指令后按下Enter添加" :disabled="!formModel.enable" feedback>
            <a-input-tag v-model:model-value="formModel.yearlyCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
          </a-form-item>

          <a-form-item field="yesterdayCommands" label="昨日指令" tooltip="昨日词云命令" extra="输入一个指令后按下Enter添加" :disabled="!formModel.enable" feedback>
            <a-input-tag v-model:model-value="formModel.yesterdayCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
          </a-form-item>

          <a-form-item field="lastWeekCommands" label="上周指令" tooltip="上周词云命令" extra="输入一个指令后按下Enter添加" :disabled="!formModel.enable" feedback>
            <a-input-tag v-model:model-value="formModel.lastWeekCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
          </a-form-item>

          <a-form-item field="lastMonthCommands" label="上月指令" tooltip="上月词云命令" extra="输入一个指令后按下Enter添加" :disabled="!formModel.enable" feedback>
            <a-input-tag v-model:model-value="formModel.lastMonthCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
          </a-form-item>

          <a-form-item field="addWordCommands" label="新词指令" tooltip="添加新词命令" extra="输入一个指令后按下Enter添加" :disabled="!formModel.enable" feedback>
            <a-input-tag v-model:model-value="formModel.addWordCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
          </a-form-item>

          <a-form-item field="hideWordCommands" label="删词指令" tooltip="隐藏词汇命令" extra="输入一个指令后按下Enter添加" :disabled="!formModel.enable" feedback>
            <a-input-tag v-model:model-value="formModel.hideWordCommands" :style="{ minHeight: '100px' }" placeholder="输入指令后按下回车添加" allow-clear />
          </a-form-item>

          <a-form-item field="defaultMasks" label="默认蒙版" tooltip="默认蒙版，对应下面设置的蒙版名称，未指定任何蒙版时将使用默认蒙版，不存在任何默认蒙版时将使用矩形" :disabled="!formModel.enable" feedback>
            <a-select v-model:model-value="formModel.defaultMasks" :options="maskOptions" :style="{ minHeight: '100px' }" :scrollbar="true" placeholder="选择一个或多个蒙版" allow-search allow-clear multiple>
            </a-select>
          </a-form-item>

          <a-form-item field="processingMsg" label="执行提示" tooltip="开始执行前返的提示内容，不填表示不发送" extra="输入“[”可以快速插入图片码" :disabled="!formModel.enable" feedback>
            <preview-textarea v-model:model-value="formModel.processingMsg" :facePaths="facePaths" />
          </a-form-item>
        </a-card>

        <a-card class="card" v-for="(item, index) of formModel.masks" :key="index" :title="`蒙版${padLeft((index + 1).toString(), (0).toString(), 2)}`">
          <template #extra>
            <a-popconfirm @ok="onDeleteMask(index)" content="确定要删除这个蒙版吗？" type="warning" position="br">
              <span class="delCard">删除</span>
            </a-popconfirm>
          </template>

          <a-form-item :field="`masks[${index}].width`" label="图片宽度" tooltip="根据模板生成词语的宽度，高度将根据宽度等比例缩放" :disabled="!formModel!.enable" :rules="[{ required: true, message: '必须输入一个数字' }]" feedback>
            <a-input-number v-model:model-value="item.width" :style="{ maxWidth: '300px' }" :min="500" :max="2000" placeholder="输入一个数字" mode="button" size="large">
              <template #suffix>像素</template>
            </a-input-number>
          </a-form-item>

          <a-form-item :field="`masks[${index}].name`" label="蒙版名称" tooltip="蒙版名称" :disabled="!formModel.enable" :rules="[{ required: true, message: '必须输入一个名称' }]" feedback>
            <a-input v-model:model-value="item.name" placeholder="输入一个名称" allow-clear />
          </a-form-item>

          <a-form-item :field="`masks[${index}].path`" label="蒙版图片" tooltip="蒙版图片路径" :disabled="!formModel.enable" :rules="[{ required: true, message: '必须输入一个路径' }]" feedback>
            <image-input v-model:model-value="item.path" :imgPaths="maskPaths" />
          </a-form-item>
        </a-card>

        <a-card class="card addCard" size="small" :body-style="{ padding: '0px', height: '100%' }" @click="onCreateMask">
          <p class="addTemp"><icon-plus-circle-fill />点击添加一个蒙版</p>
        </a-card>

        <a-card class="card" v-for="(item, index) of formModel.subscribes" :key="index" :title="`推送任务${padLeft((index + 1).toString(), (0).toString(), 2)}`">
          <template #extra>
            <a-popconfirm @ok="onDeleteSubscribe(index)" content="确定要删除这个推送任务吗？" type="warning" position="br">
              <span class="delCard">删除</span>
            </a-popconfirm>
          </template>

          <a-form-item :field="`subscribes[${index}].enable`" label="开启任务" tooltip="是否启用该推送任务" :disabled="!formModel.enable" feedback>
            <a-switch v-model:model-value="item.enable">
              <template #checked>ON</template>
              <template #unchecked>OFF</template>
            </a-switch>
          </a-form-item>

          <a-form-item :field="`subscribes[${index}].hourRange`" label="时间范围" tooltip="读取触发时间至触发时间前N个小时内的聊天记录" :disabled="!formModel.enable || !item.enable"
            :rules="[{ required: true, message: '必须输入一个数量' }]" feedback>
            <a-input-number v-model:model-value="item.hourRange" :style="{ maxWidth: '300px' }" :min="1" :max="100000" placeholder="输入一个数字" mode="button" size="large">
              <template #suffix>小时</template>
            </a-input-number>
          </a-form-item>

          <a-form-item :field="`subscribes[${index}].name`" label="任务名称" tooltip="任务名称" :disabled="!formModel.enable || !item.enable" :rules="[{ required: true, message: '必须输入一个名称' }]" feedback>
            <a-input v-model:model-value="item.name" placeholder="输入一个名称" allow-clear />
          </a-form-item>

          <a-form-item :field="`subscribes[${index}].cron`" label="Cron" tooltip="定时器Cron表达式，详细可以百度Cron在线生成" :disabled="!formModel.enable || !item.enable"
            :rules="[{ ...cronRule }, { required: true, message: '必须输入一个Cron表达式' }]" feedback>
            <a-input v-model:model-value="item.cron" placeholder="输入一个Cron表达式" allow-clear />
          </a-form-item>

          <a-form-item :field="`subscribes[${index}].groups`" label="推送群" tooltip="指定需要生成词云并推送的群" :disabled="!formModel.enable || !item.enable" :rules="[{ required: true, message: '至少选择一个群' }]"
            feedback>
            <group-select v-model:model-value="item.groups" :options="groupOptions" placeholder="选择一个或多个群" select-all />
          </a-form-item>

          <a-form-item :field="`subscribes[${index}].masks`" label="指定蒙版" tooltip="词云蒙版，对应上面设置的蒙版名称，不填将使用默认蒙版" :disabled="!formModel.enable || !item.enable" feedback>
            <a-select v-model:model-value="item.masks" :options="maskOptions" :style="{ minHeight: '100px' }" :scrollbar="true" placeholder="选择任意蒙版" allow-search allow-clear multiple>
            </a-select>
          </a-form-item>

          <a-form-item :field="`subscribes[${index}].template`" label="消息模板" tooltip="消息模板" extra="输入“[”可以快速插入图片码" :disabled="!formModel.enable || !item.enable" feedback>
            <preview-textarea v-model:model-value="item.template" :facePaths="facePaths" />
          </a-form-item>

        </a-card>

        <a-card class="card addCard" size="small" :body-style="{ padding: '0px', height: '100%' }" @click="onCreateSubscribe">
          <p class="addTemp"><icon-plus-circle-fill />点击添加一个推送任务</p>
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
import { padLeft } from '@/utils/string';
import useLoading from '@/hooks/loading';
import { useSettingStore, usePathStore, useGroupStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import { cronRule } from '@/utils/validator'
import { FacePath } from '@/store/modules/path/types';
import type { WordCloudSetting, WordCloudMask } from '@/store/modules/setting/types';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import { List } from 'linqts';
import { computed } from 'vue';

const formRef = ref();
const { loading, setLoading } = useLoading();
const settingStore = useSettingStore();
const groupStore = useGroupStore();
const pathStore = usePathStore();
const facePaths = ref<FacePath[]>([]);
const maskPaths = ref<FacePath[]>([]);
const fontOptions = ref<string[]>([]);
const groupOptions = ref<SelectOptionData[]>([]);
const formModel = ref<WordCloudSetting>({ masks: [], subscribes: [] });
const initModel = ref<WordCloudSetting>({});

const onSubmit = async () => {
  try {
    const result = await formRef.value?.validate();
    if (result) {
      Message.error({ content: '数据有误，请重新检查', position: 'top' });
      return;
    }
    setLoading(true);
    await settingStore.saveWordCloudSetting(formModel.value);
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

const maskOptions = computed(() => {
  const masks = formModel.value?.masks ?? [];
  return new List<WordCloudMask>(masks).Select(o => o?.name ?? '').Where(o => o!.trim().length > 0).Distinct().ToArray();
});

const onCreateMask = async () => {
  formModel.value.masks?.push({});
}

const onDeleteMask = async (index: number) => {
  formModel.value.masks?.splice(index, 1)
}

const onCreateSubscribe = async () => {
  formModel.value.subscribes?.push({ enable: false });
}

const onDeleteSubscribe = async (index: number) => {
  formModel.value.subscribes?.splice(index, 1)
}

const fetchFonts = async () => {
  fontOptions.value = await pathStore.loadFontPaths();
}

const fetchFaces = async () => {
  try {
    facePaths.value = await pathStore.loadFacePaths();
  } catch (error) {
    console.log(error);
  }
};

const fetchMasks = async () => {
  try {
    maskPaths.value = await pathStore.loadMaskPaths();
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
    formModel.value = await settingStore.loadWordCloudSetting();
    initModel.value = JSON.parse(JSON.stringify(formModel.value))
  } catch (error) {
    console.log(error);
  }
  finally {
    setLoading(false);
  }
};

fetchFonts();
fetchFaces();
fetchMasks();
fetchGroups();
fetchSettings();
</script>

<script lang="ts">
export default {
  name: 'WordCloudSetting',
};
</script>