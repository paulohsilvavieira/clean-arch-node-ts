import { TypeORMHelper } from '@/infra/postgres'
import { GetAccount } from '@/domain/protocols/usecases/account'
import { AccountRepository } from '@/infra/postgres/repositories'
import { GetAccountUseCase } from '@/domain/usecases/account'

export const makeDbGetAccount = (typeOrm: TypeORMHelper): GetAccount => {
  const accountRepository = new AccountRepository(typeOrm)
  return new GetAccountUseCase(accountRepository)
}
