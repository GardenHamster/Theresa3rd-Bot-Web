export interface SettingState {
  generalSetting?: GeneralSetting;
  pixivSetting?: PixivSetting;
  permissionsSetting?: PermissionsSetting;
  manageSetting?: ManageSetting;
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

export interface ManageSetting {
  pixivCookieCommands?: string[];
  saucenaoCookieCommands?: string[];
  disableTagCommands?: string[];
  enableTagCommands?: string[];
  disableMemberCommands?: string[];
  enableMemberCommands?: string[];
  listSubCommands?: string[];
  removeSubCommands?: string[];
  bindTagCommands?: string[];
  unBindTagCommands?: string[];
}