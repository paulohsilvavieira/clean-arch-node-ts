import { ValidationComposite, RequiredValidation, EmailValidation, LengthValidation } from '@/application/validation/validators'
import { Validation } from '@/application/protocols'
import { EmailValidatorAdapter } from '@/infra/validators'

export const makeCreateAccountValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['email', 'name', 'password', 'termsAcepted']) {
    validations.push(new RequiredValidation(field))
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  validations.push(new LengthValidation('name', 6))

  validations.push(new LengthValidation('password', 8))

  return new ValidationComposite(validations)
}
