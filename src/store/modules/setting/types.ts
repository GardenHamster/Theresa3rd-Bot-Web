export interface SettingState {
  generalSetting?: GeneralSetting;
}

export interface GeneralSetting {
  prefixs: string[];
  tempPath: string;
  fontPath: string;
  clearCron: string;
  errorImgPath: string;
  errorGroups: number[];
  errorMsg: string;
  disableMsg: string;
  noPermissionsMsg: string;
  managersRequiredMsg: string;
  setuCustomDisableMsg: string;
  sendRelevantCommands: boolean;
}
