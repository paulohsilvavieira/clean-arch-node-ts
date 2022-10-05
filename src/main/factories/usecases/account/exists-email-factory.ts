import { TypeORMHelper } from '@/infra/postgres'
import { ExistsEmail } from '@/domain/protocols/usecases/account'
import { AccountRepository } from '@/infra/postgres/repositories'
import { ExistsEmailUseCase } from '@/domain/usecases/account'

export const makeExistsEmailUseCase = (typeOrm: TypeORMHelper): ExistsEmail => {
  const accountRepository = new AccountRepository(typeOrm)
  return new ExistsEmailUseCase(accountRepository)
}
