import { defineStore } from 'pinia';
import type { SubscribeData } from '@/api/subscribe';
import { GroupInfo } from '@/store/modules/group/types';
import { useGroupStore } from '@/store';
import { getPixivUserSubscribe, getPixivTagSubscribe } from '@/api/subscribe';
const groupStore = useGroupStore();

const formatSubscribe = (subscribeDatas: SubscribeData[], groupInfos: GroupInfo[]) => {};

const useSubscribeStore = defineStore('subscribe', {
  actions: {
    async loadPixivUserSubscribes(): Promise<SubscribeData[]> {
      const subscribeDatas = (await getPixivUserSubscribe()) as unknown as SubscribeData[];
      const groupDatas = groupStore.loadGroupInfos();
      for (let index = 0; index < subscribeDatas.length; index++) {
        const data = subscribeDatas[index];
        data.SubscribeGroup = data.groupId === 0 ? '所有群' : `${await groupStore.loadGroupName(data.groupId)}(${data.groupId})`;
      }
      return subscribeDatas;
    },
  },
});

export default useSubscribeStore;
