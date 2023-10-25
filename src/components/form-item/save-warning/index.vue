<style scoped lang="less">
.alert {
    position: absolute;
    z-index: 10;
    left: 0;
}
</style>

<template>
    <a-alert class="alert" type="warning" v-show="saveWarning" center>某些属性值已经被修改，但是还未进行保存</a-alert>
</template>

<script lang="ts" setup>
import { ref, computed, watch, toRefs } from 'vue';

const saveWarning = ref<boolean>(false);
const props = defineProps<{ initModel: any, formModel: any }>();
const { initModel, formModel } = toRefs(props)

const formJson = computed(() => {
    if (formModel.value === undefined) return '';
    return JSON.stringify(formModel.value);
})

const initJson = computed(() => {
    if (initModel.value === undefined) return '';
    return JSON.stringify(initModel.value);
})

watch([formJson, initJson], ([newFormJson, newInitJson], [oldFormJson, oldInitJson]) => {
    if (newFormJson === undefined) return;
    if (newInitJson === undefined) return;
    if (newFormJson.length === 0) return;
    if (newInitJson.length === 0) return;
    if (newFormJson === '{}') return;
    if (newInitJson === '{}') return;
    saveWarning.value = newFormJson !== newInitJson;
}, { deep: true }
)

</script>