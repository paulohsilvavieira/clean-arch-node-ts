import { Validation } from '@/application/protocols'
import { ValidationComposite, RequiredValidation } from '@/application/validation/validators'

export const makeSaveAddressAccountValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['accountId','addressFirstLine', 'city', 'state',
    'country',
    'zipOrPostalCode']) {
    validations.push(new RequiredValidation(field))
  }

  return new ValidationComposite(validations)
}
