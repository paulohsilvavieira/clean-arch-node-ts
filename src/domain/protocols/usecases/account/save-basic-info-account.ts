export interface BasicInfoData{
  accountId: string
  firstName: string
  secondName: string
  dateBirth: string
  documentType: string
  documentId: string
  proofIdDocumentFront: string
  proofIdDocumentBack: string
  profileImage: string
}
export interface SaveBasicInfoAccount {
  saveBasicData: (basicData: SaveBasicInfoAccount.Params) => Promise<SaveBasicInfoAccount.Response>
}
export namespace SaveBasicInfoAccount {
  export type Params={
    accountId: string
    firstName: string
    secondName: string
    dateBirth: string
    documentType: string
    documentId: string
    proofIdDocumentFront: string
    proofIdDocumentBack: string
    profileImage: string
  }
  export type Response=boolean
}
