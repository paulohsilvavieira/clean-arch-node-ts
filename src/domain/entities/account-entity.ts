import { ErrorStructure } from './error-structure'

export interface AccountData {
  id?: string
  email: string
  name: string
  password: string
  created_at?: Date
  updated_at?: Date
}

export class Account {
  public errors: ErrorStructure[]=[]
  public isValid: boolean=false
  private readonly requiredFields =['name', 'email', 'password']
  constructor (private readonly params: AccountData, private readonly validationTools?: any) {
    this.validation()
  }

  private validation () {
    this.errors = []
    const params = this.params
    this.requiredFields.forEach((field) => {
      if (!this.params[field as keyof typeof params]) {
        this.errors.push({
          param: `${field}`,
          msg: `${field} is required!`
        })
      }
    })

    this.isValid = this.errors.length === 0
  }

  toJSON () {
    return {
      ...this.params,
      created_at: this.params.created_at,
      updated_at: this.params.updated_at
    }
  }
}
