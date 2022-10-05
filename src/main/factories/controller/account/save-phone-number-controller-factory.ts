
import { TypeORMHelper } from '@/infra/postgres'
import { SavePhoneNumberController } from '@/application/controllers/account'
import { Controller } from '@/application/protocols'
import { makeSavePhoneNumberValidation } from '@/main/factories/validators/account'
import { makeSavePhoneNumberUseCase } from '@/main/factories/usecases/account'
import { Credentials } from '@/main/config'

export const makeSavePhoneNumberController = (typeOrm: TypeORMHelper, credentials: Credentials): Controller => {
  const controller = new SavePhoneNumberController(makeSavePhoneNumberValidation(), makeSavePhoneNumberUseCase(typeOrm, credentials))
  return controller
}
