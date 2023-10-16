<template>
    <a-select v-model:model-value="modelValue" :options="groupOptions" :style="{ minHeight: '100px' }" :scrollbar="true"
        :placeholder="placeholder" @change="onChange" allow-search allow-clear multiple>
        <a-option :value="0">所有群</a-option>
    </a-select>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';

let initValues: number[] = [];
const props = withDefaults(defineProps<{ modelValue?: number[], options: SelectOptionData[], placeholder?: string }>(), { placeholder: '选择一个或多个群' })
const emit = defineEmits<{ (e: "update:modelValue", value: number[]): void }>();
const modelValue = computed({
    get: () => props.modelValue ?? [],
    set: (value) => emit('update:modelValue', value)
});

const activeAll = (options: SelectOptionData[]): SelectOptionData[] => {
    for (let index = 0; index < options.length; index += 1) {
        const option = options[index];
        option.disabled = option.value !== 0;
    }
    return options;
}

const disableAll = (options: SelectOptionData[]): SelectOptionData[] => {
    for (let index = 0; index < options.length; index += 1) {
        const option = options[index];
        option.disabled = false;
    }
    return options;
}

const getInitValues = (): number[] => {
    if (initValues.length > 0) return initValues;
    initValues = props.modelValue ?? [];
    return initValues;
}

const getFullOptions = (): SelectOptionData[] => {
    const values = getInitValues();
    const options: SelectOptionData[] = Array.from(props.options, o => { return { ...o } });
    for (let index = 0; index < values.length; index += 1) {
        const groupId = values[index];
        if (groupId === 0) continue;
        if (options.some(o => o.value === groupId)) continue;
        const newOption: SelectOptionData = { label: `${groupId}(${groupId})`, value: groupId };
        options.push(newOption);
    }
    return options;
}

const onChange = (value: unknown) => {
    const newValue = value as number[];
    emit('update:modelValue', newValue);
    if (newValue.some(o => o === 0)) modelValue.value = [0];
}

const groupOptions = computed(() => {
    const options = getFullOptions();
    return modelValue.value.some(o => o === 0) ? activeAll(options) : disableAll(options);
})

</script>

<style scoped></style>