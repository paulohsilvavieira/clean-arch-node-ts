import { TypeORMHelper } from '@/infra/postgres'
import { GetAllAccountsUseCase } from '@/domain/usecases/account'
import { AccountRepository } from '@/infra/postgres/repositories'
import { GetAllAccounts } from '@/domain/protocols/usecases/account'

export const makeGetAllAccountUseCase = (typeOrm: TypeORMHelper): GetAllAccounts => {
  const accountRepository = new AccountRepository(typeOrm)
  return new GetAllAccountsUseCase(accountRepository)
}
