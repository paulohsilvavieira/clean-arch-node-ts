import { SaveAddressAccountUseCase } from '@/domain/usecases/account'
import { SaveAddressAccount } from '@/domain/protocols/usecases/account'
import { AccountRepository } from '@/infra/postgres/repositories'
import { TypeORMHelper } from '@/infra/postgres'

export const makeDbSaveAddressAccount = (typeOrm: TypeORMHelper): SaveAddressAccount => {
  const accountRepository = new AccountRepository(typeOrm)
  return new SaveAddressAccountUseCase(accountRepository)
}
