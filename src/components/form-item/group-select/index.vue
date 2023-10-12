<template>
    <a-select v-model:model-value="modelValue" :options="groupOptions" :style="{ minHeight: '100px' }" :scrollbar="true" @change="onChange" allow-search allow-clear multiple>
        <a-option :value="0">所有群</a-option>
    </a-select>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';

const props = withDefaults(defineProps<{ modelValue?: number[], options: SelectOptionData[], placeholder?: string }>(), { placeholder: '选择一个或多个群' })
const emit = defineEmits<{ (e: "update:modelValue", value: number[]): void }>();
const modelValue = computed({
    get: () => props.modelValue ?? [],
    set: (value) => emit('update:modelValue', value)
});

const onChange = (value: unknown) => {
    emit('update:modelValue', value as number[])
}

const selectAll = (options: SelectOptionData[]) => {
    const groupOptions = [...options];
    for (let index = 0; index < groupOptions.length; index += 1) {
        if (groupOptions[index].value === 0) continue;
        groupOptions[index].disabled = true;
    }
    return groupOptions;
}

const diselectAll = (options: SelectOptionData[]) => {
    const groupOptions = [...options];
    for (let index = 0; index < groupOptions.length; index += 1) {
        groupOptions[index].disabled = false;
    }
    return groupOptions;
}

const groupOptions = computed(() => {
    return modelValue.value.some(o => o === 0) ? selectAll(props.options) : diselectAll(props.options);
});

watch(modelValue, async (newValue) => {
    modelValue.value = newValue.some(o => o === 0) ? [0] : [...newValue];
});


</script>

<style scoped></style>