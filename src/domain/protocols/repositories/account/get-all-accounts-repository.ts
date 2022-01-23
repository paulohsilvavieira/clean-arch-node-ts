import { AccountModel } from '@/domain/entities/account-model'

export interface GetAllAccountsRepository {
  getAll: (filters?: any) => Promise<{accounts: AccountModel[], numberOfPages: number}>
}
