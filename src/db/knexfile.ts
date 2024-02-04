import { knexSnakeCaseMappers } from 'objection';
import * as dotEnv from 'dotenv';

dotEnv.config({
  path: '../../.env',
});

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './seeds/development',
    },
    timezone: 'UTC',
  },
  ...knexSnakeCaseMappers(),
};
