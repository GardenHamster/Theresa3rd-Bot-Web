<template>
  <div class="navbar">
    <div class="left-side">
      <a-space>
        <img alt="logo" :src="favicon" style="width: 25px; height: 25px;" />
        <a-typography-title :style="{ margin: 0, fontSize: '18px', minWidth: '100px' }" :heading="5">TheresaBot</a-typography-title>
        <icon-menu-fold v-if="!topMenu && appStore.device === 'mobile'" style="font-size: 22px; cursor: pointer" @click="toggleDrawerMenu" />
      </a-space>
    </div>
    <div class="center-side">
      <Menu v-if="topMenu" />
    </div>
    <ul class="right-side">
      <li>
        <a-tooltip :content="$t('settings.language')">
          <a-button class="nav-btn" type="outline" :shape="'circle'" @click="setDropDownVisible">
            <template #icon>
              <icon-language />
            </template>
          </a-button>
        </a-tooltip>
        <a-dropdown trigger="click" @select="changeLocale as any">
          <div ref="triggerBtn" class="trigger-btn"></div>
          <template #content>
            <a-doption v-for="item in locales" :key="item.value" :value="item.value">
              <template #icon>
                <icon-check v-show="item.value === currentLocale" />
              </template>
              {{ item.label }}
            </a-doption>
          </template>
        </a-dropdown>
      </li>
      <li>
        <a-dropdown trigger="click">
          <a-avatar :size="32" :style="{ marginRight: '8px', cursor: 'pointer' }">
            <img alt="avatar" :src="avatarImg" />
          </a-avatar>
          <template #content>
            <a-doption>
              <a-space @click="handleRefreshGroups">
                <icon-sync />
                <span>刷新群列表</span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleLogout">
                <icon-export />
                <span>退出登录</span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import favicon from '@/assets/favicon.ico';
import avatarImg from '@/assets/images/avatar.jpg';
import { computed, ref, inject } from 'vue';
import { useAppStore, useGroupStore } from '@/store';
import { LOCALE_OPTIONS } from '@/locale';
import { Modal } from '@arco-design/web-vue';
import useLocale from '@/hooks/locale';
import useUser from '@/hooks/user';
import Menu from '@/components/menu/index.vue';

const appStore = useAppStore();
const { logout } = useUser();
const { loadGroupInfos } = useGroupStore();
const { changeLocale, currentLocale } = useLocale();
const locales = [...LOCALE_OPTIONS];
const topMenu = computed(() => appStore.topMenu && appStore.menu);
const triggerBtn = ref();
const handleRefreshGroups = async () => {
  let groupInfoStr = '';
  const groupInfos = await loadGroupInfos();
  for (let index = 0; index < groupInfos.length; index += 1) {
    if (groupInfoStr.length > 0) groupInfoStr += '、';
    groupInfoStr += `${groupInfos[index].groupName}(${groupInfos[index].groupId})`
  }
  Modal.success({
    title: '刷新完毕',
    content: `共获取${groupInfos.length}个所在群：${groupInfoStr}`
  });
}
const handleLogout = () => {
  logout();
};
const setDropDownVisible = () => {
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  triggerBtn.value.dispatchEvent(event);
};
const toggleDrawerMenu = inject('toggleDrawerMenu') as () => void;
</script>

<style scoped lang="less">
.title {
  color: rgb(var(--primary-6));
}

.navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.left-side {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.center-side {
  flex: 1;
}

.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;

  :deep(.locale-select) {
    border-radius: 20px;
  }

  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  a {
    color: var(--color-text-1);
    text-decoration: none;
  }

  .nav-btn {
    border-color: rgb(var(--gray-2));
    color: rgb(var(--gray-8));
    font-size: 16px;
  }

  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }

  .trigger-btn {
    margin-left: 14px;
  }
}
</style>

<style lang="less">
.message-popover {
  .arco-popover-content {
    margin-top: 0;
  }
}
</style>
