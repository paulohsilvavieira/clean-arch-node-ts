import { AccountModel } from '@/domain/entities/account-model'

export interface GetAccount {
  get: (accountId: string) => Promise<AccountModel | undefined>
}
