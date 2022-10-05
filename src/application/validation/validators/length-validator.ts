import { InvalidParamError } from '@/application/errors'
import { Validation } from '@/application/protocols'
export class LengthValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly minLength: number) { }

  validate (input: any): Error {
    if (input[this.fieldName].length < this.minLength) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
