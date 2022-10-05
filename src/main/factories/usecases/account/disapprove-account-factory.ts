import { TypeORMHelper } from '@/infra/postgres'
import { DisapproveAccountUseCase } from '@/domain/usecases/account'
import { DisapproveAccount } from '@/domain/protocols/usecases/account'
import { AccountRepository } from '@/infra/postgres/repositories'

export const makeDbDisapproveAccount = (typeOrm: TypeORMHelper): DisapproveAccount => {
  const accountRepository = new AccountRepository(typeOrm)
  return new DisapproveAccountUseCase(accountRepository)
}
