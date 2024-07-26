<style scoped lang="less">
.spin {
  height: 100%;
  width: 100%;
}

.container {
  height: 100%;
  margin-bottom: 50px;
  overflow: auto;
}

.card {
  margin-bottom: 5px;
  position: relative;
  overflow: visible;
}

.actions {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 30px 10px 0;
  background: var(--color-bg-2);
  text-align: right;
}

.addCard {
  border: 1px dashed rgb(var(--primary-6));
  text-align: center;
  cursor: pointer;
}

.addTemp {
  font-size: 16px;
  color: rgb(var(--primary-6));
}

.delCard {
  cursor: pointer;
  padding: 10px;
}
</style>

<template>
  <a-spin class="spin" :loading="loading" tip="加载中..." :size="35">
    <div class="container">
      <a-card class="card">
        <Breadcrumb :items="['menu.collection', 'menu.collection.manage']" />
      </a-card>
      <a-card class="card" style="height: 100%;">
        <a-image-preview-group infinite>
          <a-space>
            <a-image src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp" width="200" />
            <a-image src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp" width="200" />
            <a-image src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp" width="200" />
            <a-image src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp" width="200" />
          </a-space>
        </a-image-preview-group>
      </a-card>
    </div>
  </a-spin>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useLoading from '@/hooks/loading';
import { usePathStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';

const formRef = ref();
const { loading, setLoading } = useLoading();
const pathStore = usePathStore();
</script>

<script lang="ts">
export default {
  name: 'CollectionManage',
};
</script>