export interface ActiveAccountRepository {
  active: (accountId: string) => Promise<boolean>
}
