import { Model } from 'objection';
import { type RoleModel } from 'src/db/models/role.model';

export class UserModel extends Model {
  static tableName = 'users';
  static idColumn = 'id';

  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  password?: string;
  phone?: string;
  profilePictureKey?: string;
  address?: string;
  country?: string;
  state?: string;
  roleId: number;
  role: RoleModel;
  createdAt: Date;
  updatedAt: Date;

  static relationMappings() {
    const { RoleModel } = require('src/db/models/role.model');

    return {
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: RoleModel,
        join: {
          from: `${UserModel.tableName}.role_id`,
          to: `${RoleModel.tableName}.${RoleModel.idColumn}`,
        },
        filter: (query) => query.select('id', 'slug', 'name'),
      },
    };
  }
}
