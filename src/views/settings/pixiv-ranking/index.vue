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
  <div class="container">
    <a-form ref="formRef" layout="horizontal" size="large" :auto-label-width="true" :scroll-to-first-error="true"
      :model="formModel">
      <a-card class="card">
        <save-warning :initModel="initModel" :formModel="formModel" />
        <Breadcrumb :items="['menu.settings', 'menu.settings.pixivranking']" />

        <a-tabs default-active-key="1" @change="onTabChange">
          <a-tab-pane key="1" title="全局">
            <a-form-item field="enable" label="启用功能" tooltip="是否启用该功能" feedback>
              <a-switch v-model:model-value="formModel.enable">
                <template #checked>ON</template>
                <template #unchecked>OFF</template>
              </a-switch>
            </a-form-item>

            <a-form-item field="maxScan" label="扫描数量" tooltip="每个榜单作品的最大扫描数量" :disabled="!formModel.enable" feedback>
              <a-input-number v-model:model-value="formModel.maxScan" :style="{ maxWidth: '300px' }" :min="1" :max="1000"
                placeholder="输入一个数字" mode="button" size="large">
                <template #suffix>个</template>
              </a-input-number>
            </a-form-item>

            <a-form-item field="previewInPage" label="单页显示" tooltip="合成一览图中，每张一览图最多显示多少张图片" :disabled="!formModel.enable"
              feedback>
              <a-input-number v-model:model-value="formModel.previewInPage" :style="{ maxWidth: '300px' }" :min="1"
                :max="50" placeholder="输入一个数字" mode="button" size="large">
                <template #suffix>张</template>
              </a-input-number>
            </a-form-item>

            <a-form-item field="groupCD" label="共享CD" tooltip="群共享CD，使用指令后全群需要CD才能重新使用该功能" :disabled="!formModel!.enable"
              feedback>
              <a-input-number v-model:model-value="formModel.groupCD" :style="{ maxWidth: '300px' }" :min="0"
                placeholder="输入一个数字" mode="button" size="large">
                <template #suffix>秒</template>
              </a-input-number>
            </a-form-item>

            <a-form-item field="cacheSeconds" label="缓存时间" tooltip="预览图缓存时间" :disabled="!formModel!.enable" feedback>
              <a-input-number v-model:model-value="formModel.cacheSeconds" :style="{ maxWidth: '300px' }" :min="0"
                placeholder="输入一个数字" mode="button" size="large">
                <template #suffix>秒</template>
              </a-input-number>
            </a-form-item>

            <a-form-item field="sendDetail" label="发送详情" tooltip="同时发送前N个作品的图片和详情，0表示不发送" :disabled="!formModel!.enable"
              feedback>
              <a-input-number v-model:model-value="formModel.sendDetail" :style="{ maxWidth: '300px' }" :min="0"
                placeholder="输入一个数字" mode="button" size="large">
                <template #suffix>个</template>
              </a-input-number>
            </a-form-item>

            <a-form-item field="sortType" label="排序方式" tooltip="一览图中作品的排序方式" :disabled="!formModel!.enable" feedback>
              <a-select v-model:model-value="formModel.sortType" :options="sortOptions" placeholder="选择一个排序方式"
                :style="{ maxWidth: '300px' }" :scrollbar="true"></a-select>
            </a-form-item>

            <a-form-item field="processingMsg" label="执行提示" tooltip="开始执行前返的提示内容" extra="输入“[”可以快速插入图片码"
              :disabled="!formModel.enable" feedback>
              <preview-textarea v-model:model-value="formModel.processingMsg" :facePaths="facePaths" />
            </a-form-item>

            <a-form-item field="template" label="消息模版" tooltip="榜单消息模板" extra="输入“{”可以快速插入占位符"
              :disabled="!formModel.enable" feedback>
              <a-mention v-model:model-value="formModel.template" :style="{ minHeight: '120px' }" :prefix="['{']"
                :data="templatePlaceholders" type="textarea" placeholder="不填写将使用默认模板..." auto-size allow-clear />
            </a-form-item>

          </a-tab-pane>
          <a-tab-pane key="2" title="日榜">

            <a-form-item field="daily.enable" label="启用榜单" tooltip="是否启用该榜单功能" :disabled="!formModel!.enable" feedback>
              <a-switch v-model:model-value="formModel.daily!.enable">
                <template #checked>ON</template>
                <template #unchecked>OFF</template>
              </a-switch>
            </a-form-item>

            <a-form-item field="daily.commands" label="全年龄指令" tooltip="获取全年龄榜单指令" extra="输入一个指令后按下Enter添加"
              :disabled="!formModel?.enable || !formModel.daily?.enable" feedback>
              <a-input-tag v-model:model-value="formModel.daily!.commands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>

            <a-form-item field="daily.r18Commands" label="R18指令" tooltip="获取R18榜单指令" extra="输入一个指令后按下Enter添加"
              :disabled="!formModel?.enable || !formModel.daily?.enable" feedback>
              <a-input-tag v-model:model-value="formModel.daily!.r18Commands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>

            <a-form-item field="daily.minBookCount" label="最低收藏数" tooltip="榜单作品中的最低收藏数，用于对作品进行过滤，未达到标准的作品将不显示在预览图中"
              :disabled="!formModel?.enable || !formModel.daily?.enable" feedback>
              <a-input-number v-model:model-value="formModel.daily!.minBookCount" :style="{ maxWidth: '300px' }" :min="0"
                placeholder="输入一个正整数" mode="button" size="large">
              </a-input-number>
            </a-form-item>

            <a-form-item field="daily.minBookRate" label="最低收藏率" tooltip="榜单作品中的最低收藏率，用于对作品进行过滤，未达到标准的作品将不显示在预览图中"
              :disabled="!formModel?.enable || !formModel.daily?.enable" feedback>
              <a-input-number v-model:model-value="formModel.daily!.minBookRate" :style="{ maxWidth: '300px' }" :min="0"
                :max="1" :precision="2" :step="0.01" placeholder="输入一个小数" mode="button" size="large">
              </a-input-number>
            </a-form-item>

            <a-form-item field="daily.minRatingCount" label="最低点赞数" tooltip="榜单作品中的最低点赞数，用于对作品进行过滤，未达到标准的作品将不显示在预览图中"
              :disabled="!formModel?.enable || !formModel.daily?.enable" feedback>
              <a-input-number v-model:model-value="formModel.daily!.minRatingCount" :style="{ maxWidth: '300px' }"
                :min="0" placeholder="输入一个正整数" mode="button" size="large">
              </a-input-number>
            </a-form-item>

            <a-form-item field="daily.minRatingRate" label="最低点赞率" tooltip="榜单作品中的最低点赞率，用于对作品进行过滤，未达到标准的作品将不显示在预览图中"
              :disabled="!formModel?.enable || !formModel.daily?.enable" feedback>
              <a-input-number v-model:model-value="formModel.daily!.minRatingRate" :style="{ maxWidth: '300px' }" :min="0"
                :max="1" :precision="2" :step="0.01" placeholder="输入一个小数" mode="button" size="large">
              </a-input-number>
            </a-form-item>

          </a-tab-pane>
          <a-tab-pane key="3" title="AI日榜">

            <a-form-item field="dailyAI.enable" label="启用榜单" tooltip="是否启用该榜单功能" :disabled="!formModel!.enable" feedback>
              <a-switch v-model:model-value="formModel.dailyAI!.enable">
                <template #checked>ON</template>
                <template #unchecked>OFF</template>
              </a-switch>
            </a-form-item>

            <a-form-item field="dailyAI.commands" label="全年龄指令" tooltip="获取全年龄榜单指令" extra="输入一个指令后按下Enter添加"
              :disabled="!formModel?.enable || !formModel.dailyAI?.enable" feedback>
              <a-input-tag v-model:model-value="formModel.dailyAI!.commands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>

            <a-form-item field="dailyAI.r18Commands" label="R18指令" tooltip="获取R18榜单指令" extra="输入一个指令后按下Enter添加"
              :disabled="!formModel?.enable || !formModel.dailyAI?.enable" feedback>
              <a-input-tag v-model:model-value="formModel.dailyAI!.r18Commands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>

            <a-form-item field="dailyAI.minBookCount" label="最低收藏数" tooltip="榜单作品中的最低收藏数，用于对作品进行过滤，未达到标准的作品将不显示在预览图中"
              :disabled="!formModel?.enable || !formModel.dailyAI?.enable" feedback>
              <a-input-number v-model:model-value="formModel.dailyAI!.minBookCount" :style="{ maxWidth: '300px' }"
                :min="0" placeholder="输入一个正整数" mode="button" size="large">
              </a-input-number>
            </a-form-item>

            <a-form-item field="dailyAI.minBookRate" label="最低收藏率" tooltip="榜单作品中的最低收藏率，用于对作品进行过滤，未达到标准的作品将不显示在预览图中"
              :disabled="!formModel?.enable || !formModel.dailyAI?.enable" feedback>
              <a-input-number v-model:model-value="formModel.dailyAI!.minBookRate" :style="{ maxWidth: '300px' }" :min="0"
                :max="1" :precision="2" :step="0.01" placeholder="输入一个小数" mode="button" size="large">
              </a-input-number>
            </a-form-item>

            <a-form-item field="dailyAI.minRatingCount" label="最低点赞数" tooltip="榜单作品中的最低点赞数，用于对作品进行过滤，未达到标准的作品将不显示在预览图中"
              :disabled="!formModel?.enable || !formModel.dailyAI?.enable" feedback>
              <a-input-number v-model:model-value="formModel.dailyAI!.minRatingCount" :style="{ maxWidth: '300px' }"
                :min="0" placeholder="输入一个正整数" mode="button" size="large">
              </a-input-number>
            </a-form-item>

            <a-form-item field="dailyAI.minRatingRate" label="最低点赞率" tooltip="榜单作品中的最低点赞率，用于对作品进行过滤，未达到标准的作品将不显示在预览图中"
              :disabled="!formModel?.enable || !formModel.dailyAI?.enable" feedback>
              <a-input-number v-model:model-value="formModel.dailyAI!.minRatingRate" :style="{ maxWidth: '300px' }"
                :min="0" :max="1" :precision="2" :step="0.01" placeholder="输入一个小数" mode="button" size="large">
              </a-input-number>
            </a-form-item>

          </a-tab-pane>
          <a-tab-pane key="4" title="受男性欢迎榜">

            <a-form-item field="male.enable" label="启用榜单" tooltip="是否启用该榜单功能" :disabled="!formModel!.enable" feedback>
              <a-switch v-model:model-value="formModel.male!.enable">
                <template #checked>ON</template>
                <template #unchecked>OFF</template>
              </a-switch>
            </a-form-item>

            <a-form-item field="male.commands" label="全年龄指令" tooltip="获取全年龄榜单指令" extra="输入一个指令后按下Enter添加"
              :disabled="!formModel?.enable || !formModel.male?.enable" feedback>
              <a-input-tag v-model:model-value="formModel.male!.commands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>

            <a-form-item field="male.r18Commands" label="R18指令" tooltip="获取R18榜单指令" extra="输入一个指令后按下Enter添加"
              :disabled="!formModel?.enable || !formModel.male?.enable" feedback>
              <a-input-tag v-model:model-value="formModel.male!.r18Commands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>

            <a-form-item field="male.minBookCount" label="最低收藏数" tooltip="榜单作品中的最低收藏数，用于对作品进行过滤，未达到标准的作品将不显示在预览图中"
              :disabled="!formModel?.enable || !formModel.male?.enable" feedback>
              <a-input-number v-model:model-value="formModel.male!.minBookCount" :style="{ maxWidth: '300px' }" :min="0"
                placeholder="输入一个正整数" mode="button" size="large">
              </a-input-number>
            </a-form-item>

            <a-form-item field="male.minBookRate" label="最低收藏率" tooltip="榜单作品中的最低收藏率，用于对作品进行过滤，未达到标准的作品将不显示在预览图中"
              :disabled="!formModel?.enable || !formModel.male?.enable" feedback>
              <a-input-number v-model:model-value="formModel.male!.minBookRate" :style="{ maxWidth: '300px' }" :min="0"
                :max="1" :precision="2" :step="0.01" placeholder="输入一个小数" mode="button" size="large">
              </a-input-number>
            </a-form-item>

            <a-form-item field="male.minRatingCount" label="最低点赞数" tooltip="榜单作品中的最低点赞数，用于对作品进行过滤，未达到标准的作品将不显示在预览图中"
              :disabled="!formModel?.enable || !formModel.male?.enable" feedback>
              <a-input-number v-model:model-value="formModel.male!.minRatingCount" :style="{ maxWidth: '300px' }" :min="0"
                placeholder="输入一个正整数" mode="button" size="large">
              </a-input-number>
            </a-form-item>

            <a-form-item field="male.minRatingRate" label="最低点赞率" tooltip="榜单作品中的最低点赞率，用于对作品进行过滤，未达到标准的作品将不显示在预览图中"
              :disabled="!formModel?.enable || !formModel.male?.enable" feedback>
              <a-input-number v-model:model-value="formModel.male!.minRatingRate" :style="{ maxWidth: '300px' }" :min="0"
                :max="1" :precision="2" :step="0.01" placeholder="输入一个小数" mode="button" size="large">
              </a-input-number>
            </a-form-item>

          </a-tab-pane>
          <a-tab-pane key="5" title="周榜">

            <a-form-item field="weekly.enable" label="启用榜单" tooltip="是否启用该榜单功能" :disabled="!formModel!.enable" feedback>
              <a-switch v-model:model-value="formModel.weekly!.enable">
                <template #checked>ON</template>
                <template #unchecked>OFF</template>
              </a-switch>
            </a-form-item>

            <a-form-item field="weekly.commands" label="全年龄指令" tooltip="获取全年龄榜单指令" extra="输入一个指令后按下Enter添加"
              :disabled="!formModel?.enable || !formModel.weekly?.enable" feedback>
              <a-input-tag v-model:model-value="formModel.weekly!.commands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>

            <a-form-item field="weekly.r18Commands" label="R18指令" tooltip="获取R18榜单指令" extra="输入一个指令后按下Enter添加"
              :disabled="!formModel?.enable || !formModel.weekly?.enable" feedback>
              <a-input-tag v-model:model-value="formModel.weekly!.r18Commands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>

            <a-form-item field="weekly.minBookCount" label="最低收藏数" tooltip="榜单作品中的最低收藏数，用于对作品进行过滤，未达到标准的作品将不显示在预览图中"
              :disabled="!formModel?.enable || !formModel.weekly?.enable" feedback>
              <a-input-number v-model:model-value="formModel.weekly!.minBookCount" :style="{ maxWidth: '300px' }" :min="0"
                placeholder="输入一个正整数" mode="button" size="large">
              </a-input-number>
            </a-form-item>

            <a-form-item field="weekly.minBookRate" label="最低收藏率" tooltip="榜单作品中的最低收藏率，用于对作品进行过滤，未达到标准的作品将不显示在预览图中"
              :disabled="!formModel?.enable || !formModel.weekly?.enable" feedback>
              <a-input-number v-model:model-value="formModel.weekly!.minBookRate" :style="{ maxWidth: '300px' }" :min="0"
                :max="1" :precision="2" :step="0.01" placeholder="输入一个小数" mode="button" size="large">
              </a-input-number>
            </a-form-item>

            <a-form-item field="weekly.minRatingCount" label="最低点赞数" tooltip="榜单作品中的最低点赞数，用于对作品进行过滤，未达到标准的作品将不显示在预览图中"
              :disabled="!formModel?.enable || !formModel.weekly?.enable" feedback>
              <a-input-number v-model:model-value="formModel.weekly!.minRatingCount" :style="{ maxWidth: '300px' }"
                :min="0" placeholder="输入一个正整数" mode="button" size="large">
              </a-input-number>
            </a-form-item>

            <a-form-item field="weekly.minRatingRate" label="最低点赞率" tooltip="榜单作品中的最低点赞率，用于对作品进行过滤，未达到标准的作品将不显示在预览图中"
              :disabled="!formModel?.enable || !formModel.weekly?.enable" feedback>
              <a-input-number v-model:model-value="formModel.weekly!.minRatingRate" :style="{ maxWidth: '300px' }"
                :min="0" :max="1" :precision="2" :step="0.01" placeholder="输入一个小数" mode="button" size="large">
              </a-input-number>
            </a-form-item>

          </a-tab-pane>
          <a-tab-pane key="6" title="月榜">

            <a-form-item field="monthly.enable" label="启用榜单" tooltip="是否启用该榜单功能" :disabled="!formModel!.enable" feedback>
              <a-switch v-model:model-value="formModel.monthly!.enable">
                <template #checked>ON</template>
                <template #unchecked>OFF</template>
              </a-switch>
            </a-form-item>

            <a-form-item field="monthly.commands" label="全年龄指令" tooltip="获取全年龄榜单指令" extra="输入一个指令后按下Enter添加"
              :disabled="!formModel?.enable || !formModel.monthly?.enable" feedback>
              <a-input-tag v-model:model-value="formModel.monthly!.commands" :style="{ minHeight: '100px' }"
                placeholder="输入指令后按下回车添加" allow-clear />
            </a-form-item>

            <a-form-item field="monthly.minBookCount" label="最低收藏数" tooltip="榜单作品中的最低收藏数，用于对作品进行过滤，未达到标准的作品将不显示在预览图中"
              :disabled="!formModel?.enable || !formModel.monthly?.enable" feedback>
              <a-input-number v-model:model-value="formModel.monthly!.minBookCount" :style="{ maxWidth: '300px' }"
                :min="0" placeholder="输入一个正整数" mode="button" size="large">
              </a-input-number>
            </a-form-item>

            <a-form-item field="monthly.minBookRate" label="最低收藏率" tooltip="榜单作品中的最低收藏率，用于对作品进行过滤，未达到标准的作品将不显示在预览图中"
              :disabled="!formModel?.enable || !formModel.monthly?.enable" feedback>
              <a-input-number v-model:model-value="formModel.monthly!.minBookRate" :style="{ maxWidth: '300px' }" :min="0"
                :max="1" :precision="2" :step="0.01" placeholder="输入一个小数" mode="button" size="large">
              </a-input-number>
            </a-form-item>

            <a-form-item field="monthly.minRatingCount" label="最低点赞数" tooltip="榜单作品中的最低点赞数，用于对作品进行过滤，未达到标准的作品将不显示在预览图中"
              :disabled="!formModel?.enable || !formModel.monthly?.enable" feedback>
              <a-input-number v-model:model-value="formModel.monthly!.minRatingCount" :style="{ maxWidth: '300px' }"
                :min="0" placeholder="输入一个正整数" mode="button" size="large">
              </a-input-number>
            </a-form-item>

            <a-form-item field="monthly.minRatingRate" label="最低点赞率" tooltip="榜单作品中的最低点赞率，用于对作品进行过滤，未达到标准的作品将不显示在预览图中"
              :disabled="!formModel?.enable || !formModel.monthly?.enable" feedback>
              <a-input-number v-model:model-value="formModel.monthly!.minRatingRate" :style="{ maxWidth: '300px' }"
                :min="0" :max="1" :precision="2" :step="0.01" placeholder="输入一个小数" mode="button" size="large">
              </a-input-number>
            </a-form-item>

          </a-tab-pane>
          <a-tab-pane key="7" title="定时推送"></a-tab-pane>
        </a-tabs>

      </a-card>

      <a-card class="card" v-for="(item, index) of formModel.subscribes" :key="index"
        :title="`推送任务${padLeft((index + 1).toString(), (0).toString(), 2)}`" v-show="showSubscribe">
        <template #extra>
          <a-popconfirm @ok="onDeleteCard(index)" content="确定要删除这个推送任务吗？" type="warning" position="br">
            <span class="delCard">删除</span>
          </a-popconfirm>
        </template>
        <a-form-item :field="`subscribes[${index}].enable`" label="启用推送" tooltip="是否启用该推送功能"
          :disabled="!formModel?.enable" feedback>
          <a-switch v-model:model-value="item.enable">
            <template #checked>ON</template>
            <template #unchecked>OFF</template>
          </a-switch>
        </a-form-item>
        <a-form-item :field="`subscribes[${index}].cron`" label="Cron" tooltip="定时器Cron表达式，详细可以百度Cron在线生成"
          :disabled="!formModel?.enable || !item?.enable"
          :rules="[{ ...cronRule }, { required: true, message: '必须输入一个Cron表达式' }]" feedback>
          <a-input v-model:model-value="item.cron" placeholder="输入一个Cron表达式" allow-clear />
        </a-form-item>
        <a-form-item :field="`subscribes[${index}].groups`" label="指定群" tooltip="指定需要推送的群"
          :disabled="!formModel.enable || !item.enable" :rules="[{ required: true, message: '至少选择一个群' }]" feedback>
          <group-select v-model:model-value="item.groups" :options="groupOptions" select-all />
        </a-form-item>
        <a-form-item :field="`subscribes[${index}].contents`" label="推送内容" tooltip="指定需要推送的榜单内容"
          :disabled="!formModel.enable || !item.enable" :rules="[{ required: true, message: '至少选择一个群' }]" feedback>
          <a-select v-model:model-value="item.contents" :options="contentOptions" :style="{ minHeight: '100px' }"
            :scrollbar="true" placeholder="选择一个或多个需要推送的内容" allow-search allow-clear allow-create multiple>
          </a-select>
        </a-form-item>
        <a-form-item :field="`subscribes[${index}].sendDetail`" label="发送详情" tooltip="同时发送前N个作品的图片和详情"
          :disabled="!formModel.enable || !item.enable" feedback>
          <a-input-number v-model:model-value="item.sendDetail" :style="{ maxWidth: '300px' }" :min="0"
            placeholder="输入一个数字" mode="button" size="large">
            <template #suffix>个</template>
          </a-input-number>
        </a-form-item>
      </a-card>

      <a-card class="card addCard" size="small" :body-style="{ padding: '0px', height: '100%' }"
        :style="{ marginBottom: '20px' }" v-show="showSubscribe" @click="onCreateCard">
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
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { padLeft } from '@/utils/string';
import useLoading from '@/hooks/loading';
import { useSettingStore, usePathStore, useGroupStore, useOptionStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import { FacePath } from '@/store/modules/path/types';
import { cronRule } from '@/utils/validator'
import type { PixivRankingSetting } from '@/store/modules/setting/types';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';

const formRef = ref();
const { loading, setLoading } = useLoading();
const settingStore = useSettingStore();
const groupStore = useGroupStore();
const pathStore = usePathStore();
const optionStore = useOptionStore();
const showSubscribe = ref<boolean>();
const facePaths = ref<FacePath[]>([]);
const sortOptions = ref<SelectOptionData[]>([]);
const groupOptions = ref<SelectOptionData[]>([]);
const formModel = ref<PixivRankingSetting>({ daily: {}, dailyAI: {}, male: {}, weekly: {}, monthly: {}, subscribes: [] });
const initModel = ref<PixivRankingSetting>({});

const templatePlaceholders = ref<SelectOptionData[]>([
  { label: '{Date}:日期', value: 'Date}' },
  { label: '{Ranking}:榜单', value: 'Ranking}' },
  { label: '{CacheSeconds}:缓存时间(秒)', value: 'CacheSeconds}' },
]);

const contentOptions = ref<SelectOptionData[]>([
  { label: "全年龄日榜", value: 'Daily' },
  { label: "全年龄AI日榜", value: 'DailyAI' },
  { label: "全年龄受男性欢迎榜", value: 'Male' },
  { label: "全年龄周榜", value: 'Weekly' },
  { label: "全年龄月榜", value: 'Monthly' },
  { label: "R18日榜", value: 'DailyR18' },
  { label: "R18AI日榜", value: 'DailyAIR18' },
  { label: "R18受男性欢迎榜", value: 'MaleR18' },
  { label: "R18周榜", value: 'WeeklyR18' },
]);

const onTabChange = async (key: any) => {
  showSubscribe.value = key === '7';
}

const onSubmit = async () => {
  try {
    const result = await formRef.value?.validate();
    if (result) {
      Message.error({ content: '数据有误，请重新检查', position: 'top' });
      return;
    }
    setLoading(true);
    await settingStore.savePixivRankingSetting(formModel.value);
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
  formModel.value.subscribes?.push({});
}

const onDeleteCard = async (index: number) => {
  formModel.value.subscribes?.splice(index, 1)
}

const fetchFaces = async () => {
  try {
    facePaths.value = await pathStore.loadFacePaths();
  } catch (error) {
    console.log(error);
  }
};

const fetchPixivRankingSortOptions = async () => {
  try {
    sortOptions.value = await optionStore.loadPixivRankingSortOptions();
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
    formModel.value = await settingStore.loadPixivRankingSetting();
    initModel.value = JSON.parse(JSON.stringify(formModel.value))
  } catch (error) {
    console.log(error);
  }
};

fetchFaces();
fetchGroups();
fetchPixivRankingSortOptions();
fetchSettings();
</script>

<script lang="ts">
export default {
  name: 'PixivRankingSetting',
};
</script>