export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  accountId?: number;
  role: RoleType;
}
