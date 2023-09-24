import { defineStore } from 'pinia';
import { getGroupList } from '@/api/group';
import { DataType } from '@/api/group';

const useGroupStore = defineStore('group', {
  state: (): DataType[] => ([]),
  actions: {
    async load() {
      if (this.length > 0) return;
      const result = await getGroupList() as unknown as DataType[];
      console.log(result)
      this.$patch(result);
    },
    async reload() {
      const result = await getGroupList() as unknown as DataType[];
      this.$patch(result);
    },
  },
});

export default useGroupStore;
