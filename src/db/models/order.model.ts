import { Model } from 'objection';
import { UserModel } from './user.model';

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
  orderPlacedDate?: Date;
  status?: OrderStatus;
  deliveryDate?: Date;
  billingInfo: string;
  paymentMode?: PaymentMode;
  userId: number;
  user: UserModel;
  createdAt: Date;
  updatedAt: Date;

  static relationMappings() {
    const { UserModel } = require('src/db/models/user.model');

    return {
        user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${OrderModel.tableName}.user_id`,
          to: `${UserModel.tableName}.${UserModel.idColumn}`,
        },
      },
    };
  }
}
