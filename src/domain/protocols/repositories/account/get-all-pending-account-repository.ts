import { AccountModel } from '@/domain/entities/account-model'

export interface GetAllPendingAccountRepository {
  getAllPending: (filters?: any) => Promise<{accounts: AccountModel[], numberOfPages: number}>
}
