import { AccountModel } from '@/domain/entities/account-model'

export interface GetAllPendingAccount {
  getAllPending: (filters?: any) => Promise<{accounts: AccountModel[], numberOfPages: number}>
}
