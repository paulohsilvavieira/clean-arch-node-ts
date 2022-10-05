import { getConnection, Repository, EntityTarget, createConnection } from 'typeorm'
import path from 'path'

export interface TypeOrmOptions {
  type: any
  host: string
  port: number
  entitiesExternal?: any
  username: string
  password: string
  database: string
}

export class TypeORMHelper {
  constructor (private readonly connectionOptions: TypeOrmOptions) {

  }

  async connect () {
    await createConnection({
      ...this.connectionOptions,
      entities: [path.join(__dirname , '/entities/index.{ts,js}'), this.connectionOptions.entitiesExternal],
      synchronize: true,
      name: 'default'
    })
  }

  async disconnect () {
    await getConnection().close()
  }

  async clear () {
    const connection = getConnection()
    const entities = connection.entityMetadatas
    await Promise.all(
      entities.map(async (entity) => {
        return await connection.getRepository(entity.name).delete({})
      })
    )
  }

  async isConnected () {
    return getConnection().isConnected
  }

  async getRepository<Entity>(entity: EntityTarget<Entity>): Promise<Repository<Entity>> {
    if (!getConnection().isConnected) {
      await this.connect()
    }
    const connection = getConnection()

    return connection.getRepository<Entity>(entity)
  }
}
