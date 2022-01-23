import { CreateAccountModel } from '@/domain/protocols/usecases/account'

export interface CreateAccountRepository{
  create: (basicData: CreateAccountModel) => Promise<{accountId: string}>
}
