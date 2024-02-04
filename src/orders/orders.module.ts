import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { OrderModel } from 'src/db/models/order.model';
import { OrderItemModel } from 'src/db/models/order-item.model';
import { CartItemModel } from 'src/db/models/cart-item.model';

@Module({
  imports: [
    ObjectionModule.forFeature([OrderModel, OrderItemModel, CartItemModel]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
OrdersService;
