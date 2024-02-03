import { Model } from 'objection';
import { UserModel } from './user.model';
import { ProductModel } from './product.model';

export class CartItemModel extends Model {
  static tableName = 'cart_items';
  static idColumn = 'id';

  id: number;
  quantity: number;
  userId: number;
  user: UserModel;
  productId: number;
  product: ProductModel
  createdAt: Date;
  updatedAt: Date;

  static relationMappings() {
    const { userModel } = require('./user.model');
    const { productModel } = require('./product.model');


    return {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: userModel,
            join: {
            from: `${CartItemModel.tableName}.user_id`,
            to: `users.id`,
            },
        },
        product: {
            relation: Model.BelongsToOneRelation,
            modelClass: productModel,
            join: {
              from: `${CartItemModel.tableName}.product_id`,
              to: `products.id`,
            },
          },
        };
    };
}
