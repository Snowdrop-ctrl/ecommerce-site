import { Model } from 'objection';
import { UserModel } from './user.model';
import { OrderItemModel } from './order-item.model';

export enum OrderStatus {
  ORDER_PLACED = 'order_placed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
}

export enum PaymentMode {
  COD = 'cod',
  ONLINE = 'online',
}

export class OrderModel extends Model {
  static tableName = 'orders';
  static idColumn = 'id';

  id: number;
  orderNumber?: string;
  ammount: number;
  orderPlaced?: Date;
  status?: OrderStatus;
  deliveryDate?: Date;
  billingInfo: Record<string, any>;
  paymentMode?: PaymentMode;
  userId: number;
  user: UserModel;
  orderItems: OrderItemModel[];
  createdAt: Date;
  updatedAt: Date;

  static relationMappings() {
    const { UserModel } = require('./user.model');
    const { OrderItemModel } = require('./order-item.model');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${OrderModel.tableName}.user_id`,
          to: `${UserModel.tableName}.${UserModel.idColumn}`,
        },
      },
      orderItems: {
        relation: Model.HasManyRelation,
        modelClass: OrderItemModel,
        join: {
          from: `${OrderModel.tableName}.id`,
          to: `${OrderItemModel.tableName}.order_id`,
        },
      },
    };
  }
}
