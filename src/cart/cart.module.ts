import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { CartItemModel } from 'src/db/models/cart-item.model';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports:[ObjectionModule.forFeature([CartItemModel]), ProductsModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
