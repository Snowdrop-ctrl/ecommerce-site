import { RoleModel } from '../../models/role.model';

const rolesToAdd: Partial<RoleModel>[] = [
  {
    name: 'Admin',
    slug: 'admin',
  },
  {
    name: 'User',
    slug: 'user',
  },
];

exports.seed = async function seed(knex) {
  const roles = await knex('roles').select('*');
  if (!roles.length) {
    await knex.batchInsert('roles', rolesToAdd);
  }
};
