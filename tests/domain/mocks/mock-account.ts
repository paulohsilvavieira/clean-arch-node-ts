import faker from 'faker'
import { AddressData, CreateAccount, DisapproveModel, SaveBasicInfoAccount } from '@/domain/protocols/usecases/account'

export const mockSaveInfoParams = (): SaveBasicInfoAccount.Params => ({
  accountId: '',
  firstName: faker.name.firstName(),
  secondName: faker.name.lastName(),
  dateBirth: faker.datatype.string(),
  documentType: faker.datatype.string(10),
  documentId: faker.datatype.string(10),
  proofIdDocumentFront: faker.datatype.string(10),
  proofIdDocumentBack: faker.datatype.string(10),
  profileImage: faker.datatype.string(10)
})

export const mockSaveAddressParams = (): AddressData => ({
  accountId: faker.datatype.uuid(),
  addressFirstLine: faker.datatype.string(10),
  addressSecondLine: faker.datatype.string(10),
  city: faker.datatype.string(10),
  state: faker.datatype.string(10),
  country: faker.datatype.string(10),
  zipOrPostalCode: faker.datatype.string(10),
  proofOfResidence: faker.datatype.string(10)
})

export const mockAccount = () => ({
  accountId: faker.datatype.uuid()
})

export const mockDisapproveAccount = (): DisapproveModel => ({
  accountId: faker.datatype.uuid(),
  disapprovedInfos: [
    faker.random.word(),
    faker.random.word()
  ]
})

export const mockCreateAccount = (): CreateAccount.Params => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  termsAcepted: true
})

export const mockFilters = () => ({
  currentPage: faker.datatype.number(),
  pageSize: faker.datatype.number()
})
