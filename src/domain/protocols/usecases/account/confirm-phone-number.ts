export interface ConfirmPhoneNumber {
  perform: (params: ConfirmPhoneNumber.Params) => Promise<ConfirmPhoneNumber.Response>
}

export namespace ConfirmPhoneNumber {
  export type Params={
    tokenPhoneConfirmation: string
    accountId: string
  }
  export type Response = boolean
}
