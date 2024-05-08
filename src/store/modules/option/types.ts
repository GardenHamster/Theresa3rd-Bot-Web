export interface OptionInfo {
  value: number;
  label: string;
  subOptions: OptionInfo[]
}

export interface OptionState {
  imgSizes?: string[];
  resendOptions?: OptionInfo[];
  tagMatchOptions?: OptionInfo[];
  pixivRandomOptions?: OptionInfo[];
  pixivUserScanOptions?: OptionInfo[];
  setuSourceOptions?: OptionInfo[];
  pixivRankingSortOptions?: OptionInfo[];
  dictionaryTypeOptions?: OptionInfo[];
}
