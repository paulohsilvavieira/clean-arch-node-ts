import { AccountModel } from '@/domain/entities'

export interface GetAllAccounts {
  getAll: (filters?: any) => Promise<{accounts: AccountModel[], numberOfPages: number}>
}
