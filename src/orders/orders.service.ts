import { HttpException, Inject, Injectable } from '@nestjs/common';
import { OrderHistoryDto, OrderPlaceDto, OrderStatuUpdateDto, OrdersListDto } from './orders.dto';
import { OrderModel, OrderStatus } from 'src/db/models/order.model';
import { OrderItemModel } from 'src/db/models/order-item.model';
import {v4 as uuid} from 'uuid'
import { SUCCESS_MESSAGES } from 'src/constants/success.messages';
import { CartItemModel } from 'src/db/models/cart-item.model';
import { ERROR_MESSAGES } from 'src/constants/error.messages';

@Injectable()
export class OrdersService {

  constructor(
    @Inject(OrderModel)
    private readonly orderModel: typeof OrderModel,
    @Inject(OrderItemModel)
    private readonly orderItemModel: typeof OrderItemModel,
    @Inject(CartItemModel)
    private readonly cartItemModel: typeof CartItemModel
  ){}

  async create(userId: number, body: OrderPlaceDto) {

    const {billingInfo, paymentMode, products} = body;

    const findProductMatchWithUserCart = await this.cartItemModel
    .query()
    .whereIn('productId', products.map(product => product.productId))
    .andWhere('userId', userId)

    if(findProductMatchWithUserCart.length  !== products.length) {
      throw new HttpException(ERROR_MESSAGES.PRODUCT_NOT_MATCHED, 400)
    }

    const calculateTotalAmount = products.reduce((acc, product) => acc + product.ammount, 0)

    await this.orderModel.transaction(async (trx) => {
      const orderData = await this.orderModel.query(trx).insert(
        {
          ammount:calculateTotalAmount,
          billingInfo, 
          paymentMode, 
          orderNumber: uuid(), 
          status: OrderStatus.ORDER_PLACED, 
          orderPlaced: new Date(), 
          userId
        }
      ) 

      const createOrderItemDataToInsert = products.map(product => ({
        ammount: product.ammount, 
        orderId: orderData.id, 
        productId: product.productId,
        quantity: product.quantity
      }))

      await this.orderItemModel.query(trx).insertGraph(createOrderItemDataToInsert)

      await this.cartItemModel.query().delete().where('userId', userId)
    })

    return {message: SUCCESS_MESSAGES.ORDER_PLACED_SUCCESS};
  }

  async getAll(query: OrdersListDto) {

    const {limit=10, page=1} = query;

    const orderListQueryBuilder = this.orderModel.query().limit(limit).offset((page -1)*limit)

    const totalOrdes = (await orderListQueryBuilder.clone().count('id').first()) as unknown as {count: string} 

    return {items: await orderListQueryBuilder, total: +totalOrdes?.count || 0}
  }

  async changeStatus(orderId: number, body: OrderStatuUpdateDto) {
    const findOrder = await this.orderModel.query().where('id', orderId)

    if(!findOrder) {
      throw new HttpException(ERROR_MESSAGES.ORDER_NOT_FOUND, 404)
    }

    await this.orderModel.query().update({status: body.status}).where('id', orderId)

    return {message: SUCCESS_MESSAGES.ORDER_STATUS_CHANGE_SUCCESS}
  }

  getUserOrderHistory(userId: number, query: OrderHistoryDto) {

    const queryBuilder =  this.orderModel.query().withGraphJoined('orderItems').where('userId', userId)

    if(query.status) {
      queryBuilder.andWhere('status', query.status)
    }

    return queryBuilder
  }
}
