export interface AddressData{
  accountId: string
  addressFirstLine: string
  addressSecondLine: string
  city: string
  state: string
  country: string
  zipOrPostalCode: string
  proofOfResidence: string
}
export interface SaveAddressAccount {
  saveAddress: (addressData: AddressData) => Promise<boolean>
}
