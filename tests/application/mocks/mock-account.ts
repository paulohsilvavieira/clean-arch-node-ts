import { AccountModel } from '@/domain/entities/account-model'
import {
  AddressData, ApproveAccount, DisapproveAccount, DisapproveModel,
  BasicInfoData, CreateAccount, CreateAccountModel,
  SaveAddressAccount, SaveBasicInfoAccount,
  ActiveAccount,DesactiveAccount, GetAllPendingAccount, GetAllAccounts
} from '@/domain/protocols/usecases/account'
export class SaveBasicInfoAccountSpy implements SaveBasicInfoAccount {
  params: BasicInfoData

  result = true

  async saveBasicData (params: BasicInfoData): Promise<boolean> {
    this.params = params
    return this.result
  }
}

export class SaveAddressAccountSpy implements SaveAddressAccount {
  params: AddressData

  result: boolean

  async saveAddress (params: AddressData): Promise<boolean> {
    this.params = params
    return this.result
  }
}

export class ApproveAccountSpy implements ApproveAccount {
  accountId: string

  result = true

  async approve (accountId: string): Promise<boolean> {
    this.accountId = accountId
    return this.result
  }
}

export class CreateAccountSpy implements CreateAccount {
  params: CreateAccountModel

  result = true

  async create (params: CreateAccountModel): Promise<boolean> {
    this.params = params
    return this.result
  }
}

export class DisapproveAccountSpy implements DisapproveAccount {
  params: DisapproveModel

  result = true

  async disapprove (params: DisapproveModel): Promise<boolean> {
    this.params = params
    return this.result
  }
}

export class ActiveAccountSpy implements ActiveAccount {
  accountId: string
  result=true
  async active (accountId: string): Promise<boolean> {
    this.accountId = accountId
    return this.result
  }
}

export class DesactiveAccountSpy implements DesactiveAccount {
  accountId: string
  result=true
  async desactive (accountId: string): Promise<boolean> {
    this.accountId = accountId
    return this.result
  }
}

export class GetAllPendingAccountSpy implements GetAllPendingAccount {
  filter: any
  result=
  {
    accounts: [],
    numberOfPages: 1
  }

  async getAllPending (filter: any): Promise<{accounts: AccountModel[], numberOfPages: number}> {
    this.filter = filter
    return this.result
  }
}

export class GetAllAccountsSpy implements GetAllAccounts {
  filter: any
  result=
  {
    accounts: [],
    numberOfPages: 1
  }

  async getAll (filter: any): Promise<{accounts: AccountModel[], numberOfPages: number}> {
    this.filter = filter
    return this.result
  }
}
