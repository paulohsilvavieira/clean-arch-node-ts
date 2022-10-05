import { TypeORMHelper } from '@/infra/postgres'
import { DesactiveAccountUseCase } from '@/domain/usecases/account'
import { DesactiveAccount } from '@/domain/protocols/usecases/account'
import { AccountRepository } from '@/infra/postgres/repositories'

export const makeDbDesactiveAccount = (typeOrm: TypeORMHelper): DesactiveAccount => {
  const accountRepository = new AccountRepository(typeOrm)
  return new DesactiveAccountUseCase(accountRepository)
}
