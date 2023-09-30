import axios from 'axios';

export interface BaseSetting {
  prefixs: string[];
  downloadPath: string;
  defaultFontPath: string;
  clearCorn: string;
  downErrorImgPath: string;
  errorGroups: number[];
  errorMsg: string;
}
