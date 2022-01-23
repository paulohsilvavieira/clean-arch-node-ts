import { TypeORMHelper } from '@/infra/postgres'
import { GetAllPendingAccountUsecase } from '@/domain/usecases/account'
import { AccountRepository } from '@/infra/postgres/repositories'
import { GetAllPendingAccount } from '@/domain/protocols/usecases/account'

export const makeDbGetAllPendingAccount = (typeOrm: TypeORMHelper): GetAllPendingAccount => {
  const accountRepository = new AccountRepository(typeOrm)
  return new GetAllPendingAccountUsecase(accountRepository)
}
