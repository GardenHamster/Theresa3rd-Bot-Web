import { defineStore } from 'pinia';
import getGroupList from '@/api/group';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import { GroupState, GroupInfo } from './types';

const toOptionDatas = (groupInfos: GroupInfo[]) => {
  const optionList: SelectOptionData[] = [{ label: '全部', value: 0 }];
  for (let i = 0; i < groupInfos.length; i += 1) {
    const state = groupInfos[i];
    const optionItem: SelectOptionData = { label: `${state.groupName}(${state.groupId})`, value: state.groupId };
    optionList.push(optionItem);
  }
  return optionList;
};

const useGroupStore = defineStore('group', {
  state: (): GroupState => ({}),
  actions: {
    async load() {
      if (this.groupInfo !== undefined) return;
      const groupInfo = await getGroupList() as unknown as GroupInfo[];
      this.groupInfo = groupInfo;
      const groupOptions = toOptionDatas(groupInfo);
      this.groupOptions = groupOptions;
    },
  },
});





export default useGroupStore;
