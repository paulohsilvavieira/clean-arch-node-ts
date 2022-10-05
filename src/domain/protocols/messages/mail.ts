
export interface Mail {
  send: (params: Mail.Params) => Promise<boolean>
}

export namespace Mail {
  export type Params ={
    destination: string
    typeEmail: 'CONFIRM_EMAIL' | 'PENDING_APPROVAL'
    locale: 'pt-BR' | 'en-US'
    contentToSend: {
      payload: any
    }
  }
  export type Result = boolean
}
