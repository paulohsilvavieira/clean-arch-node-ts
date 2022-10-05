export interface ConfirmEmail {
  perfom: (params: ConfirmEmail.Params) => Promise<ConfirmEmail.Result>
}

export namespace ConfirmEmail{
  export type Params={
    tokenConfirmation: string
    email: string
  }
  export type Result = boolean
}
