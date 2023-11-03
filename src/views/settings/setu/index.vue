<style scoped lang="less">
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
</style>

<template>
  <div class="container">
    <a-form ref="formRef" layout="horizontal" size="large" :auto-label-width="true" :scroll-to-first-error="true"
      :model="formModel">
      <a-card class="card">

        <save-warning :initModel="initModel" :formModel="formModel" />

        <Breadcrumb :items="['menu.settings', 'menu.settings.setu']" />

        <a-tabs default-active-key="1">
          <a-tab-pane key="1" title="全局">
            <a-form-item field="sendPrivate" label="同时私发" tooltip="发送到群后同时私聊发送" feedback>
              <a-switch v-model:model-value="formModel.sendPrivate">
                <template #checked>ON</template>
                <template #unchecked>OFF</template>
              </a-switch>
            </a-form-item>
            <a-form-item field="groupCD" label="共享CD" tooltip="群共享CD，使用指令后全群需要CD才能重新使用该功能" feedback>
              <a-input-number v-model:model-value="formModel.groupCD" :style="{ maxWidth: '300px' }" :min="0"
                placeholder="输入一个数字" mode="button" size="large">
                <template #suffix>秒</template>
              </a-input-number>
            </a-form-item>
            <a-form-item field="memberCD" label="独立CD" tooltip="独立CD，每个群员使用命令后需要等待的CD" feedback>
              <a-input-number v-model:model-value="formModel.memberCD" :style="{ maxWidth: '300px' }" :min="0"
                placeholder="输入一个数字" mode="button" size="large">
                <template #suffix>秒</template>
              </a-input-number>
            </a-form-item>
            <a-form-item field="maxDaily" label="次数限制" tooltip="每个成员每天最大使用次数，0表示无限制" feedback>
              <a-input-number v-model:model-value="formModel.maxDaily" :style="{ maxWidth: '300px' }" :min="0"
                placeholder="输入一个数字" mode="button" size="large">
                <template #suffix>次</template>
              </a-input-number>
            </a-form-item>
            <a-form-item field="revokeInterval" label="撤回时间" tooltip="发送涩图后撤回的时间，0表示不撤回" feedback>
              <a-input-number v-model:model-value="formModel.revokeInterval" :style="{ maxWidth: '300px' }" :min="0"
                placeholder="输入一个数字" mode="button" size="large">
                <template #suffix>秒</template>
              </a-input-number>
            </a-form-item>
            <a-form-item field="disableTagsMsg" label="标签禁用提示" tooltip="标签被禁用时返回的消息" extra="输入“[”可以快速插入图片码" feedback>
              <preview-textarea v-model:model-value="formModel.disableTagsMsg" :facePaths="facePaths" />
            </a-form-item>
            <a-form-item field="notFoundMsg" label="无结果提示" tooltip="找不到相应色图时返回的消息" extra="输入“[”可以快速插入图片码" feedback>
              <preview-textarea v-model:model-value="formModel.notFoundMsg" :facePaths="facePaths" />
            </a-form-item>
            <a-form-item field="processingMsg" label="执行前提示" tooltip="开始查找前返回的消息，不填表示不发送" extra="输入“[”可以快速插入图片码"
              :style="{ marginBottom: '200px' }" feedback>
              <preview-textarea v-model:model-value="formModel.processingMsg" :facePaths="facePaths" />
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="2" title="Pixiv">
            <a-form-item field="pixiv.enable" label="启用功能" tooltip="是否启用该功能" feedback>
              <a-switch v-model:model-value="formModel.pixiv!.enable">
                <template #checked>ON</template>
                <template #unchecked>OFF</template>
              </a-switch>
            </a-form-item>
            <a-form-item field="pixiv.commands" label="指令" tooltip="pixiv涩图指令" extra="输入一个指令后按下Enter添加"
              :disabled="!formModel.pixiv?.enable" feedback>
              <a-input-tag v-model:model-value="formModel.pixiv!.commands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>
            <a-form-item field="pixiv.randomMode" label="随机模式" tooltip="没有指定标签时获取图片的模式"
              :disabled="!formModel.pixiv?.enable" feedback>
              <a-select v-model:model-value="formModel.pixiv!.randomMode" :options="randomOptions" placeholder="选择一个模式"
                :scrollbar="true"></a-select>
            </a-form-item>
            <a-form-item field="pixiv.randomTags" label="随机标签" tooltip="随机模式指定为随机标签作品时搜索的标签"
              :disabled="!formModel.pixiv?.enable" feedback>
              <a-input-tag v-model:model-value="formModel.pixiv!.randomTags" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>
            <a-form-item field="pixiv.template" label="提示模板" tooltip="提示模板" extra="输入“{”可以快速插入占位符"
              :disabled="!formModel.pixiv?.enable" feedback>
              <a-mention v-model:model-value="formModel.pixiv!.template" :style="{ minHeight: '120px' }" :prefix="['{']"
                :data="pixivPlaceholders" type="textarea" placeholder="随便写点什么吧..." auto-size allow-clear />
            </a-form-item>
            <a-form-item field="pixiv.maxScan" label="扫描次数" tooltip="根据标签搜索时,最多扫描N个作品,不存在合格的作品时,将返回无结果提示"
              :disabled="!formModel.pixiv?.enable" feedback>
              <a-input-number v-model:model-value="formModel.pixiv!.maxScan" :style="{ maxWidth: '300px' }" :min="0"
                placeholder="输入一个数字" mode="button" size="large">
              </a-input-number>
            </a-form-item>
            <a-form-item field="pixiv.minBookmark" label="最低收藏数" tooltip="最低收藏数，用于判断涩图是否合格(标签搜索时适用)"
              :disabled="!formModel.pixiv?.enable" feedback>
              <a-input-number v-model:model-value="formModel.pixiv!.minBookmark" :style="{ maxWidth: '300px' }" :min="0"
                placeholder="输入一个正整数" mode="button" size="large">
              </a-input-number>
            </a-form-item>
            <a-form-item field="pixiv.minBookRate" label="最低收藏率" tooltip="最低收藏率(收藏数/浏览数)，用于判断涩图是否合格(标签搜索时适用)"
              :disabled="!formModel.pixiv?.enable" feedback>
              <a-input-number v-model:model-value="formModel.pixiv!.minBookRate" :style="{ maxWidth: '300px' }" :min="0"
                :max="1" :precision="2" :step="0.01" placeholder="输入一个小数" mode="button" size="large">
              </a-input-number>
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="3" title="Lolicon">
            <a-form-item field="lolicon.enable" label="启用功能" tooltip="是否启用该功能" feedback>
              <a-switch v-model:model-value="formModel.lolicon!.enable">
                <template #checked>ON</template>
                <template #unchecked>OFF</template>
              </a-switch>
            </a-form-item>
            <a-form-item field="lolicon.commands" label="指令" tooltip="lolicon涩图指令" extra="输入一个指令后按下Enter添加"
              :disabled="!formModel.lolicon?.enable" feedback>
              <a-input-tag v-model:model-value="formModel.lolicon!.commands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>
            <a-form-item field="lolicon.template" label="消息模板" tooltip="lolicon涩图消息模板" extra="输入“{”可以快速插入占位符"
              :disabled="!formModel.lolicon?.enable" feedback>
              <a-mention v-model:model-value="formModel.lolicon!.template" :style="{ minHeight: '120px' }" :prefix="['{']"
                :data="loliconPlaceholders" type="textarea" placeholder="随便写点什么吧..." auto-size allow-clear />
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="4" title="Lolisuki">
            <a-form-item field="lolisuki.enable" label="启用功能" tooltip="是否启用该功能" feedback>
              <a-switch v-model:model-value="formModel.lolisuki!.enable">
                <template #checked>ON</template>
                <template #unchecked>OFF</template>
              </a-switch>
            </a-form-item>
            <a-form-item field="lolisuki.commands" label="指令" tooltip="lolisuki涩图指令" extra="输入一个指令后按下Enter添加"
              :disabled="!formModel.lolisuki?.enable" feedback>
              <a-input-tag v-model:model-value="formModel.lolisuki!.commands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>
            <a-form-item label="级别范围" tooltip="涩图级别，值越大表示越涩，最小为0，最大为6，0~4为非R18，5~6为R18"
              :disabled="!formModel.lolisuki?.enable" feedback>
              <a-space direction="horizontal">
                <a-input-number v-model:model-value="minLevel" :style="{ maxWidth: '80px' }" :min="0" :max="6"
                  placeholder="输入一个数字" mode="embed" size="large">
                </a-input-number>
                -
                <a-input-number v-model:model-value="maxLevel" :style="{ maxWidth: '80px' }" :min="0" :max="6"
                  placeholder="输入一个数字" mode="embed" size="large">
                </a-input-number>
              </a-space>
            </a-form-item>
            <a-form-item field="lolisuki.template" label="消息模板" tooltip="lolisuki涩图消息模板" extra="输入“{”可以快速插入占位符"
              :disabled="!formModel.lolisuki?.enable" feedback>
              <a-mention v-model:model-value="formModel.lolisuki!.template" :style="{ minHeight: '120px' }"
                :prefix="['{']" :data="lolisukiPlaceholders" type="textarea" placeholder="随便写点什么吧..." auto-size
                allow-clear />
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="5" title="本地涩图">
            <a-form-item field="local.enable" label="启用功能" tooltip="是否启用该功能" feedback>
              <a-switch v-model:model-value="formModel.local!.enable">
                <template #checked>ON</template>
                <template #unchecked>OFF</template>
              </a-switch>
            </a-form-item>
            <a-form-item field="local.commands" label="指令" tooltip="本地涩图指令" extra="输入一个指令后按下Enter添加"
              :disabled="!formModel.local?.enable" feedback>
              <a-input-tag v-model:model-value="formModel.local!.commands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>
            <a-form-item field="local.localPath" label="图片目录" tooltip="本地涩图的存放目录" :disabled="!formModel.local?.enable"
              feedback>
              <a-input v-model:model-value="formModel.local!.localPath" placeholder="输入一个相对路径或者绝对路径" allow-clear />
            </a-form-item>
            <a-form-item field="local.template" label="消息模板" tooltip="本地涩图消息模板" extra="输入“{”可以快速插入占位符"
              :disabled="!formModel.local?.enable" feedback>
              <a-mention v-model:model-value="formModel.local!.template" :style="{ minHeight: '120px' }" :prefix="['{']"
                :data="localPlaceholders" type="textarea" placeholder="随便写点什么吧..." auto-size allow-clear />
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="6" title="画师作品预览">
            <a-form-item field="pixivUser.enable" label="启用功能" tooltip="是否启用该功能" feedback>
              <a-switch v-model:model-value="formModel.pixivUser!.enable">
                <template #checked>ON</template>
                <template #unchecked>OFF</template>
              </a-switch>
            </a-form-item>
            <a-form-item field="pixivUser.commands" label="指令" tooltip="生成画师作品预览图指令" extra="输入一个指令后按下Enter添加"
              :disabled="!formModel.pixivUser?.enable" feedback>
              <a-input-tag v-model:model-value="formModel.pixivUser!.commands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>
            <a-form-item field="pixivUser.processingMsg" label="执行前提示" tooltip="开始执行前返回的消息" extra="输入“[”可以快速插入图片码"
              :disabled="!formModel.pixivUser?.enable" feedback>
              <preview-textarea v-model:model-value="formModel.pixivUser!.processingMsg" :facePaths="facePaths" />
            </a-form-item>
            <a-form-item field="pixivUser.template" label="消息模板" tooltip="消息模板" extra="输入“{”可以快速插入占位符"
              :disabled="!formModel.pixivUser?.enable" feedback>
              <a-mention v-model:model-value="formModel.pixivUser!.template" :style="{ minHeight: '120px' }"
                :prefix="['{']" :data="pixivUserPlaceholders" type="textarea" placeholder="随便写点什么吧..." auto-size
                allow-clear />
            </a-form-item>
            <a-form-item field="pixivUser.maxScan" label="扫描数量" tooltip="最多扫描画师前N个作品"
              :disabled="!formModel.pixivUser?.enable" feedback>
              <a-input-number v-model:model-value="formModel.pixivUser!.maxScan" :style="{ maxWidth: '300px' }" :min="0"
                :max="1000" placeholder="输入一个数字" mode="button" size="large">
              </a-input-number>
            </a-form-item>
            <a-form-item field="pixivUser.previewInPage" label="每页数量" tooltip="合成一览图中，每张一览图最多显示多少个作品"
              :disabled="!formModel.pixivUser?.enable" feedback>
              <a-input-number v-model:model-value="formModel.pixivUser!.previewInPage" :style="{ maxWidth: '300px' }"
                :min="0" :max="100" placeholder="输入一个数字" mode="button" size="large">
              </a-input-number>
            </a-form-item>
            <a-form-item field="pixivUser.cacheSeconds" label="缓存时间" tooltip="预览图缓存时间"
              :disabled="!formModel.pixivUser?.enable" feedback>
              <a-input-number v-model:model-value="formModel.pixivUser!.cacheSeconds" :style="{ maxWidth: '300px' }"
                :min="0" placeholder="输入一个数字" mode="button" size="large">
                <template #suffix>秒</template>
              </a-input-number>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
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
import { ref, watch } from 'vue';
import useLoading from '@/hooks/loading';
import { useSettingStore, usePathStore, useGroupStore, useOptionStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import { FacePath } from '@/store/modules/path/types';
import type { SetuSetting } from '@/store/modules/setting/types';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';

const formRef = ref();
const { loading, setLoading } = useLoading();
const settingStore = useSettingStore();
const groupStore = useGroupStore();
const pathStore = usePathStore();
const optionStore = useOptionStore();
const facePaths = ref<FacePath[]>([]);
const randomOptions = ref<SelectOptionData[]>([]);
const groupOptions = ref<SelectOptionData[]>([]);
const formModel = ref<SetuSetting>({ pixiv: {}, lolicon: {}, lolisuki: {}, local: {}, pixivUser: {} });
const initModel = ref<SetuSetting>({});
const minLevel = ref<number>(0);
const maxLevel = ref<number>(0);

const pixivPlaceholders = ref<SelectOptionData[]>([
  { label: '{TodayLeft}:当天剩余使用次数', value: 'TodayLeft}' },
  { label: '{RevokeInterval}:撤回时间(秒)', value: 'RevokeInterval}' },
]);
const loliconPlaceholders = ref<SelectOptionData[]>([
  { label: '{MemberCD}:独立CD(秒)', value: 'MemberCD}' },
  { label: '{TodayLeft}:当天剩余使用次数', value: 'TodayLeft}' },
  { label: '{RevokeInterval}:撤回时间(秒)', value: 'RevokeInterval}' },
  { label: '{PixivId}:作品ID', value: 'PixivId}' },
  { label: '{IllustTitle}:作品标题', value: 'IllustTitle}' },
  { label: '{UserId}:画师ID', value: 'UserId}' },
  { label: '{UserName}:画师名称', value: 'UserName}' },
  { label: '{Urls}:图片链接', value: 'Urls}' },
]);
const lolisukiPlaceholders = ref<SelectOptionData[]>([
  { label: '{MemberCD}:独立CD(秒)', value: 'MemberCD}' },
  { label: '{TodayLeft}:当天剩余使用次数', value: 'TodayLeft}' },
  { label: '{RevokeInterval}:撤回时间(秒)', value: 'RevokeInterval}' },
  { label: '{PixivId}:作品ID', value: 'PixivId}' },
  { label: '{IllustTitle}:作品标题', value: 'IllustTitle}' },
  { label: '{UserId}:画师ID', value: 'UserId}' },
  { label: '{UserName}:画师名称', value: 'UserName}' },
  { label: '{Level}:级别', value: 'Level}' },
  { label: '{Taste}:分类', value: 'Taste}' },
  { label: '{Urls}:图片链接', value: 'Urls}' },
]);
const localPlaceholders = ref<SelectOptionData[]>([
  { label: '{MemberCD}:独立CD(秒)', value: 'MemberCD}' },
  { label: '{TodayLeft}:当天剩余使用次数', value: 'TodayLeft}' },
  { label: '{RevokeInterval}:撤回时间(秒)', value: 'RevokeInterval}' },
  { label: '{FileName}:文件名', value: 'FileName}' },
  { label: '{SizeMB}:文件大小(MB)', value: 'SizeMB}' },
]);
const pixivUserPlaceholders = ref<SelectOptionData[]>([
  { label: '{UserName}:画师名称', value: 'UserName}' },
  { label: '{CacheSeconds}:缓存时间(秒)', value: 'CacheSeconds}' },
]);

const onSubmit = async () => {
  try {
    const result = await formRef.value?.validate();
    if (result) {
      Message.error({ content: '数据有误，请重新检查', position: 'top' });
      return;
    }
    setLoading(true);
    await settingStore.saveSetuSetting(formModel.value);
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

const fetchRandomOptions = async () => {
  try {
    randomOptions.value = await optionStore.loadPixivRandomOptions();
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
    formModel.value = await settingStore.loadSetuSetting();
    initModel.value = JSON.parse(JSON.stringify(formModel.value));
    const lolisukiLevel = formModel.value?.lolisuki?.level ?? '';
    const levelArr = lolisukiLevel.trim().split('-');
    const minValue = levelArr.length > 0 ? Number(levelArr[0].trim()) : 0;
    const maxValue = levelArr.length > 1 ? Number(levelArr[1].trim()) : 0;
    minLevel.value = Math.min(minValue, maxValue);
    maxLevel.value = Math.max(minValue, maxValue);
  } catch (error) {
    console.log(error);
  }
};

watch([minLevel, maxLevel], ([newMinLevel, newMaxLevel], [oldMinLevel, oldMaxLevel]) => {
  const minValue = Math.min(newMinLevel, newMaxLevel);
  const maxValue = Math.max(newMinLevel, newMaxLevel);
  formModel.value.lolisuki!.level = `${minValue}-${maxValue}`
}
)

fetchFaces();
fetchGroups();
fetchRandomOptions();
fetchSettings();
</script>

<script lang="ts">
export default {
  name: 'SetuSetting',
};
</script>