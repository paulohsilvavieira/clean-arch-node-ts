import { CreateAccountController } from '@/presenters/api/controllers/account'
import { Controller } from '@/presenters/api/protocols'
import { makeCreateAccountUsecase } from '../../usecases/account'

export const makeCreateAccountController = (): Controller => {
  const controller = new CreateAccountController(makeCreateAccountUsecase())
  return controller
}
