import { Validation } from '@/application/protocols'
import { ValidationComposite, RequiredValidation } from '@/application/validation/validators'

export const makeSavePhoneNumberValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['accountId', 'phoneNumber']) {
    validations.push(new RequiredValidation(field))
  }

  return new ValidationComposite(validations)
}
