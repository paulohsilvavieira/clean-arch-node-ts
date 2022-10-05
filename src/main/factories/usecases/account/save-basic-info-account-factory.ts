import { SaveBasicInfoAccountUseCase } from '@/domain/usecases/account'
import { SaveBasicInfoAccount } from '@/domain/protocols/usecases/account'
import { AccountRepository } from '@/infra/postgres/repositories'
import { TypeORMHelper } from '@/infra/postgres'

export const makeDbSaveBasicInfoAccount = (typeOrm: TypeORMHelper): SaveBasicInfoAccount => {
  const accountRepository = new AccountRepository(typeOrm)

  return new SaveBasicInfoAccountUseCase(accountRepository)
}
