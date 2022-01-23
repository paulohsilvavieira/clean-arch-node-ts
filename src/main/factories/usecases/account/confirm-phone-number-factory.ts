import { ConfirmPhoneNumber } from '@/domain/protocols/usecases/account'
import { AccountRepository } from '@/infra/postgres/repositories'
import { TypeORMHelper } from '@/infra/postgres'
import { ConfirmPhoneNumberUseCase } from '@/domain/usecases/account'

export const makeConfirmPhoneNumberUseCase = (typeOrm: TypeORMHelper): ConfirmPhoneNumber => {
  const accountRepository = new AccountRepository(typeOrm)
  return new ConfirmPhoneNumberUseCase(accountRepository)
}
