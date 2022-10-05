
import { TypeORMHelper } from '@/infra/postgres'
import { ConfirmPhoneNumberController } from '@/application/controllers/account'
import { Controller } from '@/application/protocols'
import { makeSavePhoneNumberValidation } from '@/main/factories/validators/account'
import { makeConfirmPhoneNumberUseCase } from '@/main/factories/usecases/account'

export const makeConfirmPhoneNumber = (typeOrm: TypeORMHelper): Controller => {
  const controller = new ConfirmPhoneNumberController(makeSavePhoneNumberValidation(), makeConfirmPhoneNumberUseCase(typeOrm))
  return controller
}
