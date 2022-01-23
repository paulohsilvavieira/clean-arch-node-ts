export interface SavePhoneNumber {
  perform: (params: SavePhoneNumber.Params) => Promise<SavePhoneNumber.Response>
}

export namespace SavePhoneNumber {
  export type Params={
    phoneNumber: string
    accountId: string
  }
  export type Response = boolean
}
