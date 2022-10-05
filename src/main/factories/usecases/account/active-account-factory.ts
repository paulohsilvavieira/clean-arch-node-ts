import { TypeORMHelper } from '@/infra/postgres'
import { ActiveAccountUseCase } from '@/domain/usecases/account'
import { ActiveAccount } from '@/domain/protocols/usecases/account'
import { AccountRepository } from '@/infra/postgres/repositories'

export const makeDbActiveAccount = (typeOrm: TypeORMHelper): ActiveAccount => {
  const accountRepository = new AccountRepository(typeOrm)
  return new ActiveAccountUseCase(accountRepository)
}
