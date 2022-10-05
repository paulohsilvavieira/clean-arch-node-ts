export interface SMS {
  send: (params: SMS.Params) => Promise<SMS.Response>
}

export namespace SMS {
  export type Params ={
    to: string
    from: string
    body: string
  }
  export type Response = boolean
}
