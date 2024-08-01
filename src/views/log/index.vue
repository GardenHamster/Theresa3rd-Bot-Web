<template>
  <div class="container">
    <div class="panel background">
      <div class="mask">
        <a-list :data="listModels" :loading="loading" :scrollbar="true" :maxHeight="900" :split="false" :bordered="false" :hoverable="true" size="large">
          <template #item="{ item, index }">
            <a-list-item :key="index" style="padding: 3px 20px; font-size: 1.25em;" :style="{ color: item.color }" :class="['log-error']">
              <a-list-item-meta>
                <template #title>
                  <span :style="{ color: item.color }">{{ item.title }}</span>
                </template>
                <template #description>
                  <span :style="{ color: item.color }">{{ item.content }}</span>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onUnmounted } from 'vue';
import { LogRecord } from '@/api/log';
import { listLog, pullLog } from '@/api/log';
import dayjs from 'dayjs';

interface ListModel {
  title: string;
  content: string;
  color: string;
}

let lastAt = 0;
let pullTimer: number | null = null;
const loading = ref<boolean>(false);
const logList = ref<LogRecord[]>([]);
const listModels = ref<ListModel[]>([]);

const fetchLogs = async () => {
  try {
    lastAt = 0;
    loading.value = true;
    logList.value = await listLog() as unknown as LogRecord[];
    listModels.value = [];
    for (let index = 0; index < logList.value.length; index += 1) {
      listModels.value.unshift(toListModel(logList.value[index]))
      lastAt = logList.value[index].createAt!;
    }
  } catch (error) {
    console.log(error);
  }
  finally {
    loading.value = false;
  }
};

const pullLogs = async () => {
  pullTimer = Number(setInterval(async () => {
    try {
      if (lastAt === 0) return;
      loading.value = true;
      const pullList = await pullLog(lastAt) as unknown as LogRecord[];
      for (let index = 0; index < pullList.length; index += 1) {
        listModels.value.unshift(toListModel(pullList[index]))
        if (lastAt < pullList[index].createAt!) {
          lastAt = pullList[index].createAt!;
        }
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      loading.value = false;
    }
  }, 5000))
};

onUnmounted(() => {
  if (pullTimer !== null) {
    clearInterval(Number(pullTimer))
  }
})

const toListModel = (record: LogRecord): ListModel => {
  const dateTime = dayjs.unix(record.createAt!).format('YYYY-MM-DD HH:mm:ss');
  const levelStr = getLevelStr(record.level!);
  const color = getLevelColor(record.level!);
  let title = record.remind!;
  if (title.length === 0) title = record.message!;
  if (title.length === 0) title = '未知异常';
  let content = '';
  if (record.remind!.length !== 0) {
    content += record.message;
    content += '\r\n';
  }
  if (record.innerMessage!.length !== 0) {
    content += record.innerMessage;
    content += '\r\n';
  }
  if (record.stackTrace!.length !== 0) {
    content += record.stackTrace;
  }
  const listModel: ListModel = {
    title: `【${dateTime}】【${levelStr}】 ${title}`,
    content,
    color
  }
  return listModel;
}

const getLevelStr = (level: number): string => {
  switch (level) {
    case 0: return 'Debug';
    case 1: return 'Info';
    case 2: return 'Warn';
    case 3: return 'Error';
    case 4: return 'Fatal';
    default: return 'Unknow'
  }
}

const getLevelColor = (level: number): string => {
  switch (level) {
    case 0: return '#00700B';
    case 1: return '#48BB31';
    case 2: return '#BBBB23';
    case 3: return '#FF0006';
    case 4: return '#BF0005';
    default: return '#00700B'
  }
}

fetchLogs();
pullLogs();
</script>

<script lang="ts">
export default {
  name: 'Logs',
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  padding: 0px;
  background-color: var(--color-bg-2);
  border-radius: 5px;
}

.panel {
  border-radius: 4px;
}

.background {
  height: 100%;
  background: url('../../assets/images/background/71421964_p1.jpg') 100% 50% / 90%;
  background-repeat: no-repeat;
}

.mask {
  height: 100%;
  background-color: #fff;
  opacity: .7;
  z-index: 1;
  padding: 10px;
}

:deep(.arco-textarea) {
  height: 100%;
}

.log-list {
  width: 100%;
  max-height: 100%;
  background-color: transparent;
}
</style>
