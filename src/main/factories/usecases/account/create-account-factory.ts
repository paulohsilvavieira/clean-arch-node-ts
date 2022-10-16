import { CreateAccount } from '@/domain/protocols/usecases/account'
import { CreateAccountUseCase } from '@/domain/usecases/account'
import { AccountRepository } from '@/infra/postgres/repositories'

export const makeCreateAccountUsecase = (): CreateAccount => {
  const accountRepository = new AccountRepository()
  return new CreateAccountUseCase(accountRepository)
}
