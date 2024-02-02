import { knexSnakeCaseMappers } from 'objection';
import dotEnv from 'dotenv';

// dotEnv.config({
//   path: '../.env',
// });

module.exports = {
  development: {
    client: 'pg',
    // TODO fix this
    // connection: process.env.DATABASE_URL,
    connection: 'pg://postgres:myPassword@localhost:5432/ecommerce',
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
