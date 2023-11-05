import { List } from 'linqts';
import { defineStore } from 'pinia';
import { getFontPaths, getFacePaths, getMaskPaths } from '@/api/path';
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
    async loadMaskPaths(): Promise<FacePath[]> {
      if (this.maskPaths) return this.maskPaths;
      this.maskPaths = (await getMaskPaths()) as unknown as FacePath[];
      return this.maskPaths;
    },
  },
});

export default usePathStore;
