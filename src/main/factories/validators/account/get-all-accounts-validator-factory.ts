import { Validation } from '@/application/protocols'
import { ValidationComposite, RequiredValidation } from '@/application/validation/validators'

export const makeGetAllAccountsValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['currentPage', 'pageSize']) {
    validations.push(new RequiredValidation(field))
  }

  return new ValidationComposite(validations)
}
