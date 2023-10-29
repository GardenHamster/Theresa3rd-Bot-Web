export interface SettingState {
  generalSetting?: GeneralSetting;
  pixivSetting?: PixivSetting;
  permissionsSetting?: PermissionsSetting;
  manageSetting?: ManageSetting;
  menuSetting?: MenuSetting;
  repeaterSetting?: RepeaterSetting;
  welcomeSetting?: WelcomeSetting;
  reminderSetting?: ReminderSetting;
  setuSetting?: SetuSetting;
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

export interface MenuSetting {
  enable?: boolean;
  commands?: string[];
  template?: string;
}

export interface RepeaterSetting {
  enable?: boolean;
  repeatTime?: number;
  repeatMode?: number;
}

export interface WelcomeSetting {
  enable?: boolean;
  template?: string;
  specials?: WelcomeSpecial[];
}

export interface WelcomeSpecial {
  groupIds?: number[];
  template?: string;
}

export interface ReminderSetting {
  enable?: boolean;
  timers?: ReminderTimer[];
}

export interface ReminderTimer {
  enable?: boolean;
  name?: string;
  cron?: string;
  groups?: number[];
  atAll?: boolean;
  atMembers?: boolean;
  templates?: ReminderTemplate[];
}

export interface ReminderTemplate {
  template: string;
}

export interface SetuSetting {
  groupCD?: number
  memberCD?: number
  disableTagsMsg?: string
  notFoundMsg?: number
  processingMsg?: number
  maxDaily?: number
  revokeInterval?: number
  sendPrivate?: boolean
  pixiv?: PixivSetuSetting
  lolicon?: LoliconSetuSetting
  lolisuki?: LolisukiSetuSetting
  local?: LocalSetuSetting
  pixivUser?: PixivUserSetuSetting
}

export interface PixivSetuSetting {
  enable?: boolean
  commands?: string[]
  randomMode?: number
  randomTags?: string[]
  template?: string
  maxScan?: number
  minBookmark?: number
  minBookRate?: number
}

export interface LoliconSetuSetting {
  enable?: boolean
  commands?: string[]
  template?: string
}

export interface LolisukiSetuSetting {
  enable?: boolean
  commands?: string[]
  level?: string
  template?: string
}

export interface LocalSetuSetting {
  enable?: boolean
  commands?: string[]
  localPath?: string
  template?: string
}

export interface PixivUserSetuSetting {
  enable?: boolean
  commands?: string[]
  processingMsg?: string
  template?: string
  maxScan?: number
  previewInPage?: number
  cacheSeconds?: number
}