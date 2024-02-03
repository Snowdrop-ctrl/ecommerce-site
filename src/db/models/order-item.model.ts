import { Model } from 'objection';
import { ProductModel } from './product.model';
import { OrderModel } from './order.model';

export class OrderItemModel extends Model {
  static tableName = 'roles';
  static idColumn = 'id';

  id: number;
  ammount: string;
  quantity: number;
  orderId: number;
  order: OrderModel
  productId: number;
  product: ProductModel
  createdAt: Date;
  updatedAt: Date;

  static relationMappings() {
    const { OrderModel } = require('src/db/models/order.model');
    const { ProductModel } = require('src/db/models/product.model');

    return {
    order: {
        relation: Model.BelongsToOneRelation,
        modelClass: OrderModel,
        join: {
          from: `${OrderItemModel.tableName}.orderId`,
          to: `${OrderModel.tableName}.${OrderModel.idColumn}`,
        },
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductModel,
        join: {
          from: `${OrderItemModel.tableName}.productId`,
          to: `${ProductModel.tableName}.${ProductModel.idColumn}`,
        },
      },
    };
  }
}
