import { CreateAccount } from '@/domain/protocols/usecases/account'
import { CreateAccountUseCase } from '@/domain/usecases/account'
import { AccountRepository } from '@/infra/postgres/repositories'
import { TypeORMHelper } from '@/infra/postgres'
import { Mail } from '@/domain/protocols/messages'

export const makeDbCreateAccount = (typeOrm: TypeORMHelper, mailer?: Mail): CreateAccount => {
  const accountRepository = new AccountRepository(typeOrm)
  return new CreateAccountUseCase(accountRepository, mailer)
}
