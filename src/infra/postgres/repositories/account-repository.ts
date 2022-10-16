
import { CreateAccountRepository } from '@/domain/protocols/repositories/account'
import { CreateAccount } from '@/domain/protocols/usecases/account'
import { Account } from '@/infra/postgres/entities'
import { DatabaseRepository } from '../helpers/repository'
export class AccountRepository extends DatabaseRepository implements CreateAccountRepository {
  async create (createAccount: CreateAccount.Params): Promise<boolean> {
    const accountRepositoryTypeORM = this.getRepository(Account)
    const entity = accountRepositoryTypeORM.create({ ...createAccount })
    const saved = await accountRepositoryTypeORM.save(entity)
    return saved.id !== undefined
  }
}
