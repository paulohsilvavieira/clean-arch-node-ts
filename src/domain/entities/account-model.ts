export interface AccountModel{
  id: string
  firstName: string
  secondName: string
  email: string
  dateBirth: string
  documentType: string
  phoneNumber: string
  documentId: string
  proofIdDocumentFront: string
  proofIdDocumentBack: string
  addressFirstLine: string
  addressSecondLine: string
  city: string
  state: string
  country: string
  zipOrPostalCode: string
  proofOfResidence: string
  status: string
  created_at?: Date
  updated_at?: Date
}
