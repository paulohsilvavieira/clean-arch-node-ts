import { Validation } from '@/application/protocols'
import { ValidationComposite, RequiredValidation } from '@/application/validation/validators'

export const makeSaveBasicInfoAccountValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['accountId', 'firstName','secondName','email', 'documentType',
    'phoneNumber',
    'documentId',
    'proofIdDocumentFront', 'profileImage']) {
    validations.push(new RequiredValidation(field))
  }

  return new ValidationComposite(validations)
}
