import { Model } from 'objection';
import { ProductModel } from './product.model';
import { OrderModel } from './order.model';

export class OrderItemModel extends Model {
  static tableName = 'order_items';
  static idColumn = 'id';

  id: number;
  ammount: number;
  quantity: number;
  orderId: number;
  order: OrderModel;
  productId: number;
  product: ProductModel;
  createdAt: Date;
  updatedAt: Date;

  static relationMappings() {
    const { OrderModel } = require('./order.model');
    const { ProductModel } = require('./product.model');

    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: OrderModel,
        join: {
          from: `${OrderItemModel.tableName}.order_id`,
          to: `${OrderModel.tableName}.${OrderModel.idColumn}`,
        },
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductModel,
        join: {
          from: `${OrderItemModel.tableName}.product_id`,
          to: `${ProductModel.tableName}.${ProductModel.idColumn}`,
        },
      },
    };
  }
}
