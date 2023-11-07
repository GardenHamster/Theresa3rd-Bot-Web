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
import { onBeforeUnmount, onMounted, ref, toRefs, watch, computed } from 'vue';
import { getTimeStr } from '@/utils/date'

const timer = ref<number>(0);
const props = withDefaults(defineProps<{ title: string; modelValue?: number; }>(), { modelValue: 0 });
const emit = defineEmits<{ (e: "update:modelValue", value: number): void }>();
const { title } = toRefs(props);
const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const getDateString = (val: number): string => {
  return getTimeStr(val);
}

const displayValue = ref(
  getDateString(modelValue?.value ?? 0)
);

watch(modelValue, (newValue) => {
  displayValue.value = getDateString(newValue)
});

const stopTimer = () => {
  window.clearInterval(timer.value);
  timer.value = 0;
};

const startTimer = () => {
  timer.value = window.setInterval(() => {
    modelValue.value += 1;
  }, 1000);
};

onMounted(() => {
  startTimer();
});

onBeforeUnmount(() => {
  stopTimer();
});

</script>