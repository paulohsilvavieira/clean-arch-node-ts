import { TypeORMHelper } from '@/infra/postgres'
import { ApproveAccountUseCase } from '@/domain/usecases/account'
import { ApproveAccount } from '@/domain/protocols/usecases/account'
import { AccountRepository } from '@/infra/postgres/repositories'

export const makeDbApproveAccount = (typeOrm: TypeORMHelper): ApproveAccount => {
  const accountRepository = new AccountRepository(typeOrm)
  return new ApproveAccountUseCase(accountRepository)
}
