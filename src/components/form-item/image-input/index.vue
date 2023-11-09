<template>
    <a-space direction="vertical" :style="{ width: '100%' }" size="small">
        <a-auto-complete v-model:model-value="modelValue" :data="faceOptions" placeholder="输入一个相对路径或者绝对路径" allow-clear
            @change="showErrorImg" />
        <template v-if="imgHttpUrl">
            <a-image width="100px" :src="imgHttpUrl" v-show="imgVisable" />
        </template>
    </a-space>
</template>

<script lang="ts" setup>
import { ref, computed, watch, toRefs } from 'vue';
import { FacePath } from '@/store/modules/path/types';
import { getFaceHttpUrl } from '@/utils/url'
import { List } from 'linqts';

const imgHttpUrl = ref<string>('');
const imgVisable = ref<boolean>(false);
const props = withDefaults(defineProps<{ modelValue?: string, imgPaths: FacePath[], placeholder?: string }>(), { placeholder: '输入一个相对路径或者绝对路径' })
const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();
const { imgPaths } = toRefs(props)

const modelValue = computed({
    get: () => props.modelValue ?? '',
    set: (value) => emit('update:modelValue', value ?? '')
});

const faceOptions = computed(() => {
    return new List<FacePath>(imgPaths.value).Select(o => o.serverPath).ToArray()
});

const showErrorImg = async () => {
    try {
        const serverPath = modelValue.value?.trim() ?? '';
        imgVisable.value = serverPath.length > 0;
        if (serverPath.length === 0) return;
        const httpPath = new List<FacePath>(imgPaths.value).Where(o => o?.serverPath === serverPath).FirstOrDefault()?.httpPath;
        if (!httpPath || httpPath.length === 0) return;
        imgHttpUrl.value = getFaceHttpUrl(httpPath);
    } catch (error) {
        console.log(error);
    }
}

watch(modelValue, async (newValue) => {
    showErrorImg();
});

watch(imgPaths, async (newValue) => {
    showErrorImg();
});

showErrorImg();
</script>