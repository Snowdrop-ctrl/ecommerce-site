import { Model } from 'objection';
import { type UserModel } from 'src/db/models/user.model';

export class RoleModel extends Model {
  static tableName = 'roles';
  static idColumn = 'id';

  id: number;
  name: string;
  slug: string;
  users: UserModel[];
  createdAt: Date;
  updatedAt: Date;

  static relationMappings() {
    const { UserModel } = require('src/db/models/user.model');
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: UserModel,
        join: {
          from: `${RoleModel.tableName}.${RoleModel.idColumn}`,
          to: `${UserModel.tableName}.role_id`,
        },
      },
    };
  }
}
