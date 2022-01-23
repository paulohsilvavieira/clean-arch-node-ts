export interface CreateAccountModel {
  email: string
  name: string
  password: string
  termsAcepted: boolean
}

export interface CreateAccount {
  create: (account: CreateAccount.Params) => Promise<boolean>
}

export namespace CreateAccount {
  export type Params ={
    email: string
    name: string
    password: string
    termsAcepted: boolean
  }
  export type Result=boolean
}
