import { defineStore } from 'pinia';
import getGroupList from '@/api/group';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import { GroupState, GroupInfo } from './types';
import { List } from 'linqts';

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
    async loadGroupInfos(): Promise<GroupInfo[]> {
      if (this.groupInfos) return this.groupInfos;
      const groupInfos = (await getGroupList()) as unknown as GroupInfo[];
      this.groupInfos = groupInfos;
      return this.groupInfos;
    },
    async loadGroupOptions(): Promise<SelectOptionData[]> {
      const groupInfos = await this.loadGroupInfos();
      const groupOptions = toOptions(groupInfos);
      return groupOptions;
    },
    async loadGroupName(groupId: Number): Promise<string> {
      const groupInfos = await this.loadGroupInfos();
      return new List<GroupInfo>(groupInfos).Where((o) => o?.groupId === groupId).FirstOrDefault()?.groupName ?? '';
    },
  },
});

export default useGroupStore;
