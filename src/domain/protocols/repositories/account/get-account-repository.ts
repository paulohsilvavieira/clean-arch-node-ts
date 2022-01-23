import { AccountModel } from '@/domain/entities/account-model'

export interface GetAccountRepository {
  get: (accountId: string) => Promise<AccountModel | undefined>
}
