export default {
  name: 'clean-arch-api',
  type: 'postgres',
  host: process.env.PG_HOST ?? '127.0.0.1',
  port: process.env.PG_PORT ? parseInt(process.env.PG_PORT) : 5432,
  username: process.env.PG_USERNAME ?? 'root',
  password: process.env.PG_PASSWORD ?? 'admin',
  database: process.env.PG_DATABASE ?? 'exchange-abstract',
  synchronize: false,
  migrationsRun: true,
  logging: false,
  cli: {
    entitiesDir: 'src/infra/postgres/entities',
    migrationsDir: 'src/infra/postgres/migrations',
    subscribersDir: 'src/infra/postgres/subscribers'
  }
}
