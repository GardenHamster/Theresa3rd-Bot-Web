export interface OptionInfo {
  value: number;
  label: string;
}

export interface OptionState {
  imgSizes?: string[];
  resendOptions?: OptionInfo[];
  tagMatchOptions?: OptionInfo[];
  pixivRandomOptions?: OptionInfo[];
  pixivUserScanOptions?: OptionInfo[];
}
