
export interface ApproveAccount {
  approve: (accountId: string) => Promise<boolean>
}
