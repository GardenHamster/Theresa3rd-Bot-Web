<template>
  <div :class="['arco-statistic', 'arco-statistic-countdown']">
    <div v-if="title" :class="`arco-statistic-title`">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div :class="`arco-statistic-content`">
      <div :class="`arco-statistic-value`">
        {{ displayValue }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, toRefs, watch } from 'vue';
import { getTimeStr } from '@/utils/date'

interface Props {
  title?: string;
  value?: number;
}

const timer = ref<number>(0);
const props = defineProps<Props>();
const { title } = toRefs(props);
const value = ref<number>(props?.value ?? 0);

const getDateString = (val: number): string => {
  return getTimeStr(val);
}

const displayValue = ref(
  getDateString(value.value)
);

watch(value, (newValue) => {
  displayValue.value = getDateString(newValue)
});

const stopTimer = () => {
  window.clearInterval(timer.value);
  timer.value = 0;
};

const startTimer = () => {
  timer.value = window.setInterval(() => {
    value.value += 1;
  }, 1000);
};

onMounted(() => {
  startTimer();
});

onBeforeUnmount(() => {
  stopTimer();
});

</script>