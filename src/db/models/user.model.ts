import { Model } from 'objection';
import { type RoleModel } from './role.model';

export class UserModel extends Model {
  static tableName = 'users';
  static idColumn = 'id';

  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  phoneNumber?: string;
  profilePictureKey?: string;
  address?: string;
  country?: string;
  state?: string;
  roleId: number;
  role: RoleModel;
  createdAt: Date;
  updatedAt: Date;

  static relationMappings() {
    const { RoleModel } = require('./role.model');

    return {
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: RoleModel,
        join: {
          from: `${UserModel.tableName}.role_id`,
          to: `${RoleModel.tableName}.${RoleModel.idColumn}`,
        },
      },
    };
  }
}
