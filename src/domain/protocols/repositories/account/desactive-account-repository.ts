export interface DesactiveAccountRepository {
  desactive: (accountId: string) => Promise<boolean>
}
