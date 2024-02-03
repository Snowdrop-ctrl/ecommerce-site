import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './db/db.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [DatabaseModule, ProductsModule, UsersModule, OrdersModule, RolesModule, AuthModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
