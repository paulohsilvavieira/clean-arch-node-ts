export interface ActiveAccount {
  active: (accountId: string) => Promise<boolean>
}
