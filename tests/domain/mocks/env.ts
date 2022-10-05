/* eslint-disable @typescript-eslint/no-var-requires */
import { TypeOrmOptions } from '@/infra/postgres'
import path from 'path'

const environmentApi: TypeOrmOptions = require(path.resolve(__dirname, '../../../ormconfig.json'))
export default environmentApi
