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
  <a-spin class="spin" :loading="loading" tip="加载中..." :size="35">
    <div class="container">
      <a-form ref="formRef" layout="horizontal" size="large" :auto-label-width="true" :scroll-to-first-error="true" :model="formModel">
        <a-card class="card">
          <save-warning :initModel="initModel" :formModel="formModel" />
          <Breadcrumb :items="['menu.settings', 'menu.settings.pixiv']" />

          <a-form-item field="freeProxy" label="免代理模式" tooltip="开启Pixiv免代理模式，该模式下使用图片代理下载图片，请确保图片代理地址可用。梯子网络较好的情况下不建议开启" feedback>
            <a-switch v-model:model-value="formModel.freeProxy">
              <template #checked>ON</template>
              <template #unchecked>OFF</template>
            </a-switch>
          </a-form-item>

          <a-form-item field="httpProxy" label="网络代理" tooltip="Pixiv代理地址，值为空时使用本地代理，免代理模式启用后失效，格式：http://127.0.0.1:7890" feedback>
            <a-input v-model:model-value="formModel.httpProxy" placeholder="输入一个Http/Https地址" allow-clear />
          </a-form-item>

          <a-form-item field="imgProxy" label="图片代理" tooltip="图片代理地址，值为空时使用本地代理，免代理模式启用后使用该值下载图片，默认：https://i.pixiv.re" feedback>
            <a-input v-model:model-value="formModel.httpProxy" placeholder="输入一个Http/Https地址" allow-clear />
          </a-form-item>

          <a-form-item field="originUrlProxy" label="链接代理" tooltip="Pixiv图片链接的代理地址，方便在QQ内点击打开直接查看原图，格式：https://i.pximg.net。注意不要填写比如：https://i.pixiv.re 这类腾讯提示感叹号的地址，会有大概率触发风控或者冻结等可能"
            :rules="[{ ...proxyRule }, { required: true, message: '必须输入一个代理地址' }]" feedback>
            <a-input v-model:model-value="formModel.originUrlProxy" placeholder="输入一个Http/Https地址" allow-clear />
          </a-form-item>

          <a-form-item field="imgSize" label="图片尺寸" tooltip="发送图片的尺寸大小，从上到下表示从小到大。默认为thumb" feedback>
            <a-select v-model:model-value="formModel.imgSize" :options="imgSizeOptions" :style="{ maxWidth: '300px' }" placeholder="选择一个尺寸" :scrollbar="true"></a-select>
          </a-form-item>

          <a-form-item field="imgResend" label="重发模式" tooltip="图片发送失败后的操作" feedback>
            <a-select v-model:model-value="formModel.imgResend" :options="resendOptions" :style="{ maxWidth: '300px' }" placeholder="选择一个模式" :scrollbar="true"></a-select>
          </a-form-item>

          <a-form-item field="sendImgBehind" label="图文分离" tooltip="将图片和详情分开发送，先发送作品信息，后发送图片，可以开启此项避免图片发送失败时整条消息被吞" feedback>
            <a-switch v-model:model-value="formModel.sendImgBehind">
              <template #checked>ON</template>
              <template #unchecked>OFF</template>
            </a-switch>
          </a-form-item>

          <a-form-item field="r18ImgBlur" label="高斯模糊" tooltip="R18图片高斯模糊处理程度" feedback>
            <a-input-number v-model:model-value="formModel.r18ImgBlur" :style="{ maxWidth: '300px' }" :min="5" :max="100" placeholder="输入一个数字" mode="button" size="large" />
          </a-form-item>

          <a-form-item field="imgShowMaximum" label="发送图片数" tooltip="发送作品时最多显示N张图片，0表示无限制" feedback>
            <a-input-number v-model:model-value="formModel.imgShowMaximum" :style="{ maxWidth: '300px' }" :min="0" :max="99" placeholder="输入一个数字" mode="button" size="large" />
          </a-form-item>

          <a-form-item field="tagShowMaximum" label="发送标签数" tooltip="发送作品时最多显示N个标签，0表示无限制" feedback>
            <a-input-number v-model:model-value="formModel.tagShowMaximum" :style="{ maxWidth: '300px' }" :min="0" :max="99" placeholder="输入一个数字" mode="button" size="large" />
          </a-form-item>

          <a-form-item field="urlShowMaximum" label="发送链接数" tooltip="发送作品时最多显示N条图片链接，0表示无限制" feedback>
            <a-input-number v-model:model-value="formModel.urlShowMaximum" :style="{ maxWidth: '300px' }" :min="0" :max="99" placeholder="输入一个数字" mode="button" size="large" />
          </a-form-item>

          <a-form-item field="imgRetryTimes" label="图片下载次数" tooltip="图片下载失败后重试下载次数，0表示不重试" feedback>
            <a-input-number v-model:model-value="formModel.imgRetryTimes" :style="{ maxWidth: '300px' }" :min="0" :max="10" placeholder="输入一个数字" mode="button" size="large" />
          </a-form-item>

          <a-form-item field="errRetryTimes" label="错误重试次数" tooltip="作品信息读取失败后的重试次数，0表示不重试" feedback>
            <a-input-number v-model:model-value="formModel.errRetryTimes" :style="{ maxWidth: '300px' }" :min="0" :max="10" placeholder="输入一个数字" mode="button" size="large" />
          </a-form-item>

          <a-form-item field="generalTarget" label="普通作品标准" tooltip="非AI和非R18作品推送标准，收藏数需要达到(最低收藏数*标准)，其他相关参数同理" feedback>
            <a-input-number v-model:model-value="formModel.generalTarget" :style="{ maxWidth: '300px' }" :min="0" :max="100" :precision="2" :step="0.01" placeholder="输入一个数字" mode="button"
              size="large" />
          </a-form-item>

          <a-form-item field="aiTarget" label="AI作品标准" tooltip="AI作品推送标准，收藏数需要达到(最低收藏数*标准)，其他相关参数同理" feedback>
            <a-input-number v-model:model-value="formModel.aiTarget" :style="{ maxWidth: '300px' }" :min="0" :max="100" :precision="2" :step="0.01" placeholder="输入一个数字" mode="button" size="large" />
          </a-form-item>

          <a-form-item field="r18Target" label="R18作品标准" tooltip="R18作品推送标准，收藏数需要达到(最低收藏数*标准)，其他相关参数同理" feedback>
            <a-input-number v-model:model-value="formModel.r18Target" :style="{ maxWidth: '300px' }" :min="0" :max="100" :precision="2" :step="0.01" placeholder="输入一个数字" mode="button" size="large" />
          </a-form-item>

          <a-form-item field="cookieExpireDay" label="CK保质期" tooltip="Cookie失效时间，超过该时间后需要使用命令更新cookie，建议cookie每60天左右更新一次" feedback>
            <a-input-number v-model:model-value="cookieExpireDay" :style="{ maxWidth: '300px' }" :min="1" :max="180" placeholder="输入一个数字" mode="button" size="large">
              <template #suffix>日</template>
            </a-input-number>
          </a-form-item>

          <a-form-item field="cookieExpireMsg" label="CK过期提示" tooltip="Cookie过期后返回的提示消息" extra="输入“[”可以快速插入图片码" feedback>
            <preview-textarea v-model:model-value="formModel.cookieExpireMsg" :facePaths="facePaths" />
          </a-form-item>

          <a-form-item field="template" label="消息模板" tooltip="Pixiv作品信息模版，值为空时将使用默认模版" extra="输入“{”可以快速插入占位符" feedback>
            <a-mention v-model:model-value="formModel.template" :style="{ minHeight: '120px' }" :prefix="['{']" :data="placeholders" type="textarea" placeholder="随便写点什么吧..." auto-size allow-clear />
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
import { ref, computed } from 'vue';
import useLoading from '@/hooks/loading';
import { useSettingStore, usePathStore, useOptionStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import { FacePath } from '@/store/modules/path/types';
import { proxyRule } from '@/utils/validator'
import type { PixivSetting } from '@/store/modules/setting/types';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';

const formRef = ref();
const { loading, setLoading } = useLoading();
const settingStore = useSettingStore();
const pathStore = usePathStore();
const optionStore = useOptionStore();
const facePaths = ref<FacePath[]>([]);
const resendOptions = ref<SelectOptionData[]>([]);
const imgSizeOptions = ref<SelectOptionData[]>([]);
const formModel = ref<PixivSetting>({});
const initModel = ref<PixivSetting>({});
const placeholders = ref<SelectOptionData[]>([
  { label: '{PixivId}:作品ID', value: 'PixivId}' },
  { label: '{IllustTitle}:作品标题', value: 'IllustTitle}' },
  { label: '{UserId}:画师ID', value: 'UserId}' },
  { label: '{UserName}:画师名', value: 'UserName}' },
  { label: '{BookmarkCount}:收藏数', value: 'BookmarkCount}' },
  { label: '{LikeCount}:点赞数', value: 'LikeCount}' },
  { label: '{ViewCount}:浏览数', value: 'ViewCount}' },
  { label: '{PageCount}:作品图片数', value: 'PageCount}' },
  { label: '{RelevantCount}:相关作品数', value: 'RelevantCount}' },
  { label: '{Tags}:作品标签', value: 'Tags}' },
  { label: '{Urls}:图片链接', value: 'Urls}' },
]);

const cookieExpireDay = computed({
  get() {
    return Math.floor((formModel.value.cookieExpire ?? 0) / 60 / 60 / 24);
  },
  set(value) {
    formModel.value.cookieExpire = value * 60 * 60 * 24;
  }
})

const onSubmit = async () => {
  try {
    const result = await formRef.value?.validate();
    if (result) {
      Message.error({ content: '数据有误，请重新检查', position: 'top' });
      return;
    }
    setLoading(true);
    await settingStore.savePixivSetting(formModel.value);
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

const fetchResendOptions = async () => {
  try {
    resendOptions.value = await optionStore.loadResendOptions();
  } catch (error) {
    console.log(error);
  }
};

const fetchImgSizeOptions = async () => {
  try {
    imgSizeOptions.value = await optionStore.loadImgSizeOptions();
  } catch (error) {
    console.log(error);
  }
};

const fetchSettings = async () => {
  try {
    setLoading(true);
    formModel.value = await settingStore.loadPixivSetting();
    initModel.value = JSON.parse(JSON.stringify(formModel.value))
  } catch (error) {
    console.log(error);
  }
  finally {
    setLoading(false);
  }
};

fetchFaces();
fetchResendOptions();
fetchImgSizeOptions();
fetchSettings();
</script>

<script lang="ts">
export default {
  name: 'PixivSetting',
};
</script>