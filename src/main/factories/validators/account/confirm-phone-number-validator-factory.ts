import { Validation } from '@/application/protocols'
import { ValidationComposite, RequiredValidation } from '@/application/validation/validators'

export const makeConfirmPhonenNumberValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['accountId', 'tokenPhoneConfirmation']) {
    validations.push(new RequiredValidation(field))
  }

  return new ValidationComposite(validations)
}
