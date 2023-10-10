export interface SettingState {
  generalSetting?: GeneralSetting;
  pixivSetting?: PixivSetting;
  permissionsSetting?: PermissionsSetting;
}

export interface GeneralSetting {
  prefixs?: string[];
  tempPath?: string;
  fontPath?: string;
  clearCron?: string;
  errorImgPath?: string;
  errorGroups?: number[];
  errorMsg?: string;
  disableMsg?: string;
  noPermissionsMsg?: string;
  managersRequiredMsg?: string;
  setuCustomDisableMsg?: string;
  sendRelevantCommands?: boolean;
}

export interface PixivSetting {
  freeProxy?: boolean;
  httpProxy?: string;
  imgProxy?: string;
  imgShowMaximum?: number;
  tagShowMaximum?: number;
  urlShowMaximum?: number;
  imgSize?: string;
  imgResend?: number;
  r18ImgBlur?: number;
  originUrlProxy?: string;
  sendImgBehind?: boolean;
  imgRetryTimes?: number;
  errRetryTimes?: number;
  cookieExpire?: number;
  cookieExpireMsg?: string;
  template?: string;
  generalTarget?: number;
  aiTarget?: number;
  r18Target?: number;
}

export interface PermissionsSetting {
  superManagers?: number[];
  limitlessMembers?: number[];
  acceptGroups?: number[];
  setuGroups?: number[];
  setuShowImgGroups?: number[];
  setuShowAIGroups?: number[];
  setuShowR18Groups?: number[];
  setuShowR18ImgGroups?: number[];
  setuCustomGroups?: number[];
  setuNoneCDGroups?: number[];
  setuLimitlessGroups?: number[];
  saucenaoGroups?: number[];
  saucenaoR18Groups?: number[];
  subscribeGroups?: number[];
  pixivRankingGroups?: number[];
  wordCloudGroups?: number[];
}