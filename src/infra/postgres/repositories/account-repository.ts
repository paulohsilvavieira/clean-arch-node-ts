import { ActiveAccountRepository, ApproveAccountRepository, ConfirmEmailRepository, ConfirmPhoneNumberRepository, CreateAccountRepository, DesactiveAccountRepository, DisapproveAccountRepository, GetAccountRepository, GetAllAccountsRepository, GetAllPendingAccountRepository, SaveAddressAccountRepository, SaveBasicInfoAccountRepository, SavePhoneNumberRepository, VerifyExistsEmailRepository } from '@/domain/protocols/repositories/account'
import { BasicInfoData , AddressData, CreateAccountModel, DisapproveModel, ConfirmEmail, ConfirmPhoneNumber, SavePhoneNumber } from '@/domain/protocols/usecases/account'
import { TypeORMHelper } from '@/infra/postgres'
import { Account } from '@/infra/postgres/entities'
import { AccountModel } from '@/domain/entities/account-model'
export class AccountRepository implements SaveBasicInfoAccountRepository,
SaveAddressAccountRepository, ApproveAccountRepository, CreateAccountRepository,
DisapproveAccountRepository, ActiveAccountRepository, DesactiveAccountRepository,
GetAllPendingAccountRepository,
VerifyExistsEmailRepository,
GetAccountRepository, GetAllAccountsRepository, ConfirmEmailRepository, ConfirmPhoneNumberRepository, SavePhoneNumberRepository {
  constructor (private readonly typeOrmHelper: TypeORMHelper) {}
  async confirmPhone (params: ConfirmPhoneNumber.Params): Promise<boolean> {
    const { tokenPhoneConfirmation, accountId } = params
    const accountRepositoryTypeORM = await this.typeOrmHelper.getRepository(Account)
    const accountData = await accountRepositoryTypeORM.findOne({ id: accountId, tokenPhoneConfirmation, status: 'PENDING_PHONE_CONFIRMATION' })
    if (!accountData) {
      return false
    }
    const saved = await accountRepositoryTypeORM.save({
      ...accountData,
      status: 'PENDING_BASIC_INFO',
      disapproveInfo: ''
    })
    return saved !== undefined
  }

  async savePhone (params: SavePhoneNumber.Params): Promise<boolean> {
    const { phoneNumber, accountId } = params
    const accountRepositoryTypeORM = await this.typeOrmHelper.getRepository(Account)
    const accountData = await accountRepositoryTypeORM.findOne({ id: accountId, status: 'PENDING_PHONE_CONFIRMATION' })
    if (!accountData) {
      return false
    }
    const saved = await accountRepositoryTypeORM.save({
      ...accountData,
      phoneNumber
    })
    return saved !== undefined
  }

  async exists (email: string): Promise<boolean> {
    const accountRepositoryTypeORM = await this.typeOrmHelper.getRepository(Account)
    const accountData = await accountRepositoryTypeORM.findOne({ email })
    return accountData !== undefined
  }

  async confirm (params: ConfirmEmail.Params): Promise<boolean> {
    const { email, tokenConfirmation } = params
    const accountRepositoryTypeORM = await this.typeOrmHelper.getRepository(Account)
    const accountData = await accountRepositoryTypeORM.findOne({ email, tokenConfirmation, status: 'PEDING_EMAIL_CONFIRMATION' })
    if (!accountData) {
      return false
    }
    const saved = await accountRepositoryTypeORM.save({
      ...accountData,
      status: 'PENDING_PHONE_CONFIRMATION',
      disapproveInfo: ''
    })
    return saved !== undefined
  }

  async get (accountId: string): Promise<AccountModel | undefined> {
    const accountRepositoryTypeORM = await this.typeOrmHelper.getRepository(Account)
    const accountData = await accountRepositoryTypeORM.findOne({ id: accountId })
    return accountData
  }

  async getAllPending (filters?: any): Promise<{accounts: AccountModel[], numberOfPages: number}> {
    const accountRepositoryTypeORM = await this.typeOrmHelper.getRepository(Account)

    const accountsLength = await accountRepositoryTypeORM.count({
      status: 'PENDING_APPROVAL'
    })

    const currentPage = Number(filters.currentPage)
    const pageSize = Number(filters.pageSize)
    const limit = pageSize || 10
    const offset = currentPage === 1 || pageSize > accountsLength ? 0 : limit * currentPage - pageSize
    const numberOfPages = Math.ceil(accountsLength / pageSize)

    const accounts = await accountRepositoryTypeORM.find({
      where: {
        status: 'PENDING_APPROVAL'
      },
      take: limit,
      skip: offset
    })

    return { accounts, numberOfPages }
  }

  async getAll (filters?: any): Promise<{accounts: AccountModel[], numberOfPages: number}> {
    const accountRepositoryTypeORM = await this.typeOrmHelper.getRepository(Account)

    const accountsLength = await accountRepositoryTypeORM.count({})

    const currentPage = Number(filters.currentPage)
    const pageSize = Number(filters.pageSize)
    const limit = pageSize || 10
    const offset = currentPage === 1 || pageSize > accountsLength ? 0 : limit * currentPage - pageSize
    const numberOfPages = Math.ceil(accountsLength / pageSize)

    const accounts = await accountRepositoryTypeORM.find({
      take: limit,
      skip: offset
    })

    return { accounts, numberOfPages }
  }

  async create (createAccount: CreateAccountModel): Promise<{accountId: string}> {
    const accountRepositoryTypeORM = await this.typeOrmHelper.getRepository(Account)
    const entity = accountRepositoryTypeORM.create({ ...createAccount, status: 'PEDING_EMAIL_CONFIRMATION' })
    const saved = await accountRepositoryTypeORM.save(entity)
    return {
      accountId: saved.id
    }
  }

  async saveBasicData (basicData: BasicInfoData): Promise<boolean> {
    const accountRepositoryTypeORM = await this.typeOrmHelper.getRepository(Account)
    const accountData = await accountRepositoryTypeORM.findOne({ id: basicData.accountId })
    const { ...rest } = basicData
    const saved = accountRepositoryTypeORM.save({ ...accountData, ...rest, status: 'PENDING_ADDRESS' })
    return saved !== undefined
  }

  async saveAddress (addressData: AddressData): Promise<boolean> {
    const accountRepositoryTypeORM = await this.typeOrmHelper.getRepository(Account)
    const accountData = await accountRepositoryTypeORM.findOne({ id: addressData.accountId })
    const { ...rest } = addressData

    const saved = await accountRepositoryTypeORM.save({ ...accountData, ...rest , status: 'PENDING_APPROVAL' })

    return saved !== undefined
  }

  async approve (accountId: string): Promise<boolean> {
    const accountRepositoryTypeORM = await this.typeOrmHelper.getRepository(Account)

    const AccountData = await accountRepositoryTypeORM.findOne({ id: accountId })

    const saved = await accountRepositoryTypeORM.save({
      ...AccountData,
      status: 'APPROVED',
      disapproveInfo: ''
    })

    return saved !== undefined
  }

  async disapprove (disapproveData: DisapproveModel): Promise<boolean> {
    const accountRepositoryTypeORM = await this.typeOrmHelper.getRepository(Account)

    const accountData = await accountRepositoryTypeORM.findOne({ id: disapproveData.accountId })

    const saved = await accountRepositoryTypeORM.save({
      ...accountData,
      status: 'PENDING_FIX_INFO',
      disapproveInfo: JSON.stringify(disapproveData.disapprovedInfos)
    })

    return saved !== undefined
  }

  async active (accountId: string): Promise<boolean> {
    const accountRepositoryTypeORM = await this.typeOrmHelper.getRepository(Account)

    const AccountData = await accountRepositoryTypeORM.findOne({ id: accountId })

    const saved = await accountRepositoryTypeORM.save({
      ...AccountData,
      active: true
    })

    return saved !== undefined
  }

  async desactive (accountId: string): Promise<boolean> {
    const accountRepositoryTypeORM = await this.typeOrmHelper.getRepository(Account)

    const AccountData = await accountRepositoryTypeORM.findOne({ id: accountId })

    const saved = await accountRepositoryTypeORM.save({
      ...AccountData,
      active: false
    })

    return saved !== undefined
  }
}
