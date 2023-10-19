<template>
  <div class="container">
    <div class="left-side">
      <div class="panel background">
        <div class="mask">
          <Banner />
          <DataPanel />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Banner from './components/banner.vue';
import DataPanel from './components/data-panel.vue';
</script>

<script lang="ts">
export default {
  name: 'Dashboard', // If you want the include property of keep-alive to take effect, you must name the component
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  padding: 15px 20px 5px 20px;
  display: flex;
  border-radius: 5px;
}

.left-side {
  flex: 1;
  overflow: auto;
  background-color: var(--color-bg-2);
  height: 100%;
}

.right-side {
  width: 280px;
  margin-left: 16px;
}

.panel {
  border-radius: 4px;
  overflow: auto;
}

.background {
  height: 100%;
  overflow: auto;
  background: url('../../../assets/images/background/112539581_p0.png') 80% 15% / cover;
}

.mask {
  height: 100%;
  overflow: auto;
  background-color: #fff;
  opacity: .75;
  z-index: 1;
}

:deep(.panel-border) {
  margin-bottom: 0;
  border-bottom: 1px solid rgb(var(--gray-2));
}

.moduler-wrap {
  border-radius: 4px;
  background-color: var(--color-bg-2);

  :deep(.text) {
    font-size: 12px;
    text-align: center;
    color: rgb(var(--gray-8));
  }

  :deep(.wrapper) {
    margin-bottom: 8px;
    text-align: center;
    cursor: pointer;

    &:last-child {
      .text {
        margin-bottom: 0;
      }
    }

    &:hover {
      .icon {
        color: rgb(var(--arcoblue-6));
        background-color: #e8f3ff;
      }

      .text {
        color: rgb(var(--arcoblue-6));
      }
    }
  }

  :deep(.icon) {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-bottom: 4px;
    color: rgb(var(--dark-gray-1));
    line-height: 32px;
    font-size: 16px;
    text-align: center;
    background-color: rgb(var(--gray-1));
    border-radius: 4px;
  }
}
</style>

<style lang="less" scoped>
// responsive
.mobile {
  .container {
    display: block;
  }

  .right-side {
    // display: none;
    width: 100%;
    margin-left: 0;
    margin-top: 16px;
  }
}
</style>
