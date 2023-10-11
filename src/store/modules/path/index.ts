import { List } from 'linqts';
import { defineStore } from 'pinia';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import { getFontPaths, getFacePaths } from '@/api/path';
import { PathState, FacePath } from './types';

const usePathStore = defineStore('path', {
  state: (): PathState => ({}),
  actions: {
    async loadFontPaths(): Promise<string[]> {
      if (this.fontPaths) return this.fontPaths;
      this.fontPaths = (await getFontPaths()) as unknown as string[];
      return this.fontPaths;
    },
    async loadFacePaths(): Promise<FacePath[]> {
      if (this.facePaths) return this.facePaths;
      this.facePaths = (await getFacePaths()) as unknown as FacePath[];
      return this.facePaths;
    },
    async loadFaceServerPaths(): Promise<string[]> {
      const facePaths = await this.loadFacePaths();
      return new List<FacePath>(facePaths).Select(o => o.serverPath).ToArray();
    },
    async loadFaceMentions(): Promise<SelectOptionData[]> {
      const facePaths = await this.loadFacePaths();
      const optionList: SelectOptionData[] = [];
      for (let i = 0; i < facePaths.length; i += 1) {
        const face = facePaths[i];
        const optionItem: SelectOptionData = { label: `[image:${face.serverPath}]`, value: `image:${face.serverPath}]` };
        optionList.push(optionItem);
      }
      return optionList;
    },
  },
});

export default usePathStore;
