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
  saucenaoSetting?: SaucenaoSetting;
  subscribeSetting?: SubscribeSetting;
  timingSetuSetting?: TimingSetuSetting;
  pixivRankingSetting?: PixivRankingSetting;
  wordCloudSetting?: WordCloudSetting;
  gameSetting?: GameSetting;
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
  acceptFriendRequest?: boolean;
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
  gameGroups?: number[];
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
  disablePixiverCommands?: string[];
  enablePixiverCommands?: string[];
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
  groups?: number[];
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

export interface SaucenaoSetting {
  enable?: boolean
  commands?: string[]
  notFoundMsg?: string
  processingMsg?: string
  template?: string
  memberCD?: number
  maxDaily?: number
  maxReceive?: number
  minSimilarity?: number
  saucenaoReadCount?: number
  pixivPriority?: number
  singlePriority?: number
  imagePriority?: number
  pullOrigin?: boolean
  sendPrivate?: boolean
  revokeInterval?: number
  revokeSearched?: boolean
  continueAscii2d?: boolean
  ascii2dWithIp?: boolean
  ascii2dReadCount?: number
}

export interface SubscribeSetting {
  miyoushe?: MiyousheSubscribeSetting
  pixivUser?: PixivUserSubscribeSetting
  pixivTag?: PixivTagSubscribeSetting
}

export interface MiyousheSubscribeSetting {
  enable?: boolean
  addCommands?: string[]
  rmCommands?: string[]
  template?: string
  scanInterval?: number
  shelfLife?: number
}

export interface PixivUserSubscribeSetting {
  enable?: boolean
  scanMode?: number
  addCommands?: string[]
  rmCommands?: string[]
  syncCommands?: string[]
  template?: string
  scanInterval?: number
  shelfLife?: number
  sendMerge?: boolean
}

export interface PixivTagSubscribeSetting {
  enable?: boolean
  addCommands?: string[]
  rmCommands?: string[]
  template?: string
  scanInterval?: number
  shelfLife?: number
  maxScan?: number
  minBookmark?: number
  minBookPerHour?: number
  minBookRate?: number
  sendMerge?: string
}

export interface TimingSetuSetting {
  enable?: boolean
  localPath?: string
  fromOneDir?: boolean
  lolisukiLevel?: string
  timers?: TimingSetuTimer[]
}

export interface TimingSetuTimer {
  enable?: boolean
  cron?: string
  name?: string
  groups?: number[]
  source?: number
  sendMerge?: boolean
  tags?: string[]
  quantity?: number
  atAll?: boolean
  timingMsg?: string
}

export interface PixivRankingSetting {
  enable?: boolean
  processingMsg?: string
  template?: string
  maxScan?: number
  previewInPage?: number
  sortType?: number
  groupCD?: number
  cacheSeconds?: number
  sendDetail?: number
  daily?: R18PixivRankingSetting
  dailyAI?: R18PixivRankingSetting
  male?: R18PixivRankingSetting
  weekly?: R18PixivRankingSetting
  monthly?: SafePixivRankingSetting
  subscribes?: SubscribesPixivRankingSetting[]
}

export interface R18PixivRankingSetting {
  enable?: boolean
  commands?: string[]
  r18Commands?: string[]
  minRatingCount?: number
  minRatingRate?: number
  minBookCount?: number
  minBookRate?: number
}

export interface SafePixivRankingSetting {
  enable?: boolean
  commands?: string[]
  minRatingCount?: number
  minRatingRate?: number
  minBookCount?: number
  minBookRate?: number
}

export interface SubscribesPixivRankingSetting {
  enable?: boolean
  cron?: string
  groups?: number[]
  contents?: string[]
  sendDetail?: number
}

export interface WordCloudSetting {
  enable?: boolean
  groupCD?: number
  maxWords?: number
  defaultWidth?: number
  defaultHeight?: number
  fontPath?: string
  processingMsg?: string
  basicCommands?: string[]
  dailyCommands?: string[]
  weeklyCommands?: string[]
  monthlyCommands?: string[]
  yearlyCommands?: string[]
  yesterdayCommands?: string[]
  lastWeekCommands?: string[]
  lastMonthCommands?: string[]
  addWordCommands?: string[]
  hideWordCommands?: string[]
  defaultMasks?: string[]
  masks?: WordCloudMask[]
  subscribes?: WordCloudSubscribes[]
}

export interface WordCloudMask {
  name?: string
  path?: string
  width?: number
}

export interface WordCloudSubscribes {
  enable?: boolean
  name?: string
  cron?: string
  masks?: string[]
  groups?: number[]
  hourRange?: number
  template?: string
}

export interface GameSetting {
  enable?: boolean;
  joinCommands?: string[];
  startCommands?: string[];
  stopCommands?: string[];
  undercover?: UndercoverSetting;
}

export interface UndercoverSetting {
  enable?: boolean;
  createCommands?: string[];
  addWordCommands?: string[];
  sendWordCommands?: string[];
  addWordLimits?: number;
  sendIdentity?: boolean;
  privateVote?: boolean;
  firstRoundNonVoting?: number;
  maxSimilarity?: number;
  matchSeconds?: number;
  prepareSeconds?: number;
  speakingSeconds?: number;
  votingSeconds?: number;
  failedMuteSeconds?: number;
  violatedMuteSeconds?: number;
  ruleMsg?: string;
}