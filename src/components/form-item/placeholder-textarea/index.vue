
<style scoped>
:deep(.arco-textarea) {
    min-height: 120px;
}
</style>

<template>
    <a-mention v-model:model-value="modelValue" :prefix="[prefix]" :data="mentions" type="textarea" placeholder="随便写点什么吧..." allow-clear />
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import { Placeholder } from '@/types/global'
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';

const props = withDefaults(defineProps<{ modelValue?: string, placeholder?: string, prefix?: string, suffix?: string, placeholders: Placeholder[] }>(), { modelValue: '', placeholder: '随便写点什么吧...', prefix: '{', suffix: '}' })
const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();
const { placeholders, prefix, suffix } = toRefs(props)

const modelValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});

const mentions = computed(() => {
    const suffixStr: string = suffix.value;
    const prefixStr: string = prefix.value;
    const placeholderList: Placeholder[] = placeholders.value;
    const optionList: SelectOptionData[] = [];
    for (let i = 0; i < placeholderList.length; i += 1) {
        const { key } = placeholderList[i];
        const { explain } = placeholderList[i];
        const optionItem: SelectOptionData = { label: `${prefixStr}${key}${suffixStr}:${explain}`, value: `${key}${suffixStr}` };
        optionList.push(optionItem);
    }
    return optionList;
});
</script>