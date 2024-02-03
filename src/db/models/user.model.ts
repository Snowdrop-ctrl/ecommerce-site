import { Model } from 'objection';
import { type RoleModel } from './role.model';
import { CartItemModel } from './cart-item.model';

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
  cartItems: CartItemModel[]
  createdAt: Date;
  updatedAt: Date;

  static relationMappings() {
    const { RoleModel } = require('./role.model');
    const { CartItemModel } = require('./cart-item.model');


    return {
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: RoleModel,
        join: {
          from: `${UserModel.tableName}.role_id`,
          to: `${RoleModel.tableName}.${RoleModel.idColumn}`,
        },
      },
      cartItems: {
        relation: Model.HasManyRelation,
        modelClass: CartItemModel,
        join: {
          from: `${UserModel.tableName}.id`,
          to: `${CartItemModel.tableName}.user_id`,
        },
      },
    };
  }
}
