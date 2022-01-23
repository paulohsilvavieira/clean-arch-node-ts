export interface DesactiveAccount {
  desactive: (accountId: string) => Promise<boolean>
}
