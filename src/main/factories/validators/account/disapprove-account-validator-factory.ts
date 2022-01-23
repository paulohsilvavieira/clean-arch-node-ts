import { Validation } from '@/application/protocols'
import { ValidationComposite, RequiredValidation } from '@/application/validation/validators'

export const makeDisapproveAccountAccountValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['accountId', 'disapproveInfo']) {
    validations.push(new RequiredValidation(field))
  }

  return new ValidationComposite(validations)
}
