<template>
    <a-space direction="vertical" :style="{ width: '100%', position: 'relative' }" size="mini">
        <a-mention v-model:model-value="modelValue" :style="{ minHeight: '120px' }" :prefix="['[']" :data="imgMentions"
            type="textarea" placeholder="随便写点什么吧..." @focus="onFocus" @blur="onBlur" @change="onChange" auto-size
            allow-clear />
        <transition name="preview">
            <p class="preview" v-show="preview">
                <template v-for="(content, index) in contents " :key="index">
                    <span v-if="(content.type === PreviewType.Text)">{{ (content.value as PreviewText).text }}</span>
                    <a-image v-if="(content.type === PreviewType.Image)" width="100" :src="getImgHttpUrl(content)" />
                </template>
            </p>
        </transition>
    </a-space>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import { FacePath } from '@/store/modules/path/types';
import { getFaceHttpUrl } from '@/utils/url'
import { PreviewType, PreviewText, PreviewImage, PreviewContent, analysis } from '@/utils/analysis';

const preview = ref(false);
const contents = ref<PreviewContent[]>([]);
const props = withDefaults(defineProps<{ modelValue: string, facePaths: FacePath[] }>(), { modelValue: '' })
const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();

const modelValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});

const watchValue = watch(modelValue, async (newValue) => {
    contents.value = await analysis(props.facePaths, newValue);
});

const imgMentions = computed(() => {
    const optionList: SelectOptionData[] = [];
    for (let i = 0; i < props.facePaths.length; i += 1) {
        const face = props.facePaths[i];
        const optionItem: SelectOptionData = { label: `[image:${face.serverPath}]`, value: `image:${face.serverPath}]` };
        optionList.push(optionItem);
    }
    return optionList;
});

const onFocus = async () => {
    preview.value = true;
}
const onBlur = async () => {
    preview.value = false;
}

const onChange = (value: string) => {
    emit('update:modelValue', value)
}

const getImgHttpUrl = function (content: PreviewContent): string {
    const image = content.value as PreviewImage;
    const path = image?.path ?? '';
    return getFaceHttpUrl(path);
}

</script>

<style scoped>
.preview {
    display: flex;
    flex-direction: column;
    border: 2px dashed rgb(var(--primary-6));
    color: rgb(var(--primary-6));
    border-radius: 5px;
    padding: 12px 10px;
    margin: 0px;
    width: 100%;
    overflow: auto;
    box-sizing: border-box;
    gap: 10px;
    position: absolute;
    z-index: 100;
    background-color: white;
}

.preview-enter-active {
    animation: fold 0.2s ease;
}

.preview-leave-active {
    animation: fold 0.2s ease reverse;
}

@keyframes fold {
    100% {
        transform: scaleY(1);
        transform-origin: top;
    }

    0% {
        transform: scaleY(0);
        transform-origin: top;
    }
}
</style>