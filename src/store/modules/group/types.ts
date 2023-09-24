import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';

export interface GroupInfo {
  groupId: number;
  groupName: string;
}

export interface GroupState {
  groupInfo?: GroupInfo[];
  groupOptions?: SelectOptionData[];
}