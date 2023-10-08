<template>
    <a-space direction="vertical" :style="{ width: '100%' }" size="mini">
        <a-mention v-model:model-value="inputvalue" :style="{ minHeight: '100px' }" :prefix="['[']" type="textarea"
            placeholder="输入“[”可以快速插入图片码" @focus="onFocus" @blur="onBlur" @change="onChange" auto-size allow-clear />
        <transition name="preview">
            <p class="preview" v-show="preview">
                <template v-for="(content, index) in contents" :key="index">
                    <span v-if="(content.type === PreviewType.Text)">{{ (content.value as PreviewText).text }}</span>
                    <a-image v-if="(content.type === PreviewType.Image)" width="100"
                        :src="`http://127.0.0.1:5000/${(content.value as PreviewImage).path}`" />
                </template>
            </p>
        </transition>
    </a-space>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';

enum PreviewType {
    Text = 1,
    Image = 2,
}

interface PreviewText {
    text: string;
}

interface PreviewImage {
    path: string;
}

interface PreviewContent {
    type: PreviewType;
    value: PreviewText | PreviewImage;
}

const preview = ref(false);
const contents = ref<PreviewContent[]>([]);
const props = withDefaults(defineProps<{ modelValue: string }>(), { modelValue: '' })
const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>()
const inputvalue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});

watch(inputvalue, (newValue, oldValue) => {
    const content1: PreviewContent = { type: PreviewType.Text, value: { text: newValue } };
    const content2: PreviewContent = { type: PreviewType.Image, value: { path: 'img/face/emmm.jpg' } };
    contents.value = [];
    contents.value.push(content1);
    contents.value.push(content2);
})

const onFocus = async () => {
    preview.value = true;
}
const onBlur = async () => {
    preview.value = false;
}
const onChange = (value: string) => {
    emit('update:modelValue', value)
}

</script>

<style scoped>
.preview {
    display: flex;
    flex-direction: column;
    border: 2px dashed rgb(var(--primary-6));
    color: rgb(var(--primary-6));
    border-radius: 3px;
    padding: 10px;
    margin: 0px;
    width: auto;
    overflow: auto;
    box-sizing: border-box;
    gap: 10px;
}

.preview-enter-active {
    animation: fadeIn 0.2s ease-in;
}

.preview-leave-active {
    animation: fadeOut 0.2s ease-in;
}
</style>