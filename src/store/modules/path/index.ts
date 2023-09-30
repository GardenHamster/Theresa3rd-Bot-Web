import { defineStore } from 'pinia';
import { getFontPaths, getFacePaths } from '@/api/path';
import { PathState } from './types';

const usePathStore = defineStore('path', {
  state: (): PathState => ({}),
  actions: {
    async loadFontPaths(): Promise<string[]> {
      if (this.fontPaths) return this.fontPaths;
      this.fontPaths = (await getFontPaths()) as unknown as string[];
      return this.fontPaths;
    },
    async loadFacePaths(): Promise<string[]> {
      if (this.facePaths) return this.facePaths;
      this.facePaths = (await getFacePaths()) as unknown as string[];
      return this.facePaths;
    },
  },
});

export default usePathStore;
