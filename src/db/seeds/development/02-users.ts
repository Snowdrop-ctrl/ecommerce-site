import * as bcryptjs from 'bcryptjs';
import { camelCaseToSnakeCase } from '../../utils';
import { UserModel } from 'src/db/models/user.model';

const usersToAdd: Partial<UserModel>[] = [
  {
    firstName: 'Test user one',
    lastName: 'Test user',
    email: 'test+user1@gmail.tech',
    roleId: 1,
    password: bcryptjs.hashSync('Testuser123#', 10),
  },
  {
    firstName: 'Test user two',
    lastName: 'Test user',
    email: 'test+user2@gmail.tech',
    roleId: 2,
    password: bcryptjs.hashSync('Testuser123#', 10),
  },
];

exports.seed = async function seed(knex) {
  const users = await knex('users').select('*');
  if (!users.length) {
    await knex.batchInsert('users', usersToAdd.map(camelCaseToSnakeCase));
  }
};
