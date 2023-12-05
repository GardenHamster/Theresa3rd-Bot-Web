import { defineStore } from 'pinia';
import { getGroupList, loadGroupList } from '@/api/group';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import { GroupState, GroupInfo } from './types';

const toOptions = (groupInfos: GroupInfo[]) => {
  const optionList: SelectOptionData[] = [];
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
    async getGroupInfos(): Promise<GroupInfo[]> {
      if (this.groupInfos) return this.groupInfos;
      this.groupInfos = (await getGroupList()) as unknown as GroupInfo[];
      return this.groupInfos;
    },
    async loadGroupInfos(): Promise<GroupInfo[]> {
      this.groupInfos = (await loadGroupList()) as unknown as GroupInfo[];
      return this.groupInfos;
    },
    async getGroupOptions(): Promise<SelectOptionData[]> {
      const groupInfos = await this.getGroupInfos();
      const groupOptions = toOptions(groupInfos);
      return groupOptions;
    },
  },
});

export default useGroupStore;
