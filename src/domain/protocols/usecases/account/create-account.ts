import { ErrorStructure } from '@/domain/entities/error-structure'

export interface CreateAccount {
  execute: (account: CreateAccount.Params) => Promise<CreateAccount.Result>
}

export namespace CreateAccount {
  export type Params ={
    email: string
    name: string
    password: string
    termsAcepted: boolean
  }
  export type Result={
    success: boolean
    errors: ErrorStructure[] | Error
  }
}
