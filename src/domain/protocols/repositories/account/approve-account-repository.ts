export interface ApproveAccountRepository {
  approve: (accountId: string) => Promise<boolean>
}
