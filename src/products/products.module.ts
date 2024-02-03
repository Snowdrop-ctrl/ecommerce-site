import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { ProductModel } from 'src/db/models/product.model';
import { ProductCategoryModel } from 'src/db/models/product-category.model';

@Module({
  imports:[ObjectionModule.forFeature([ProductModel, ProductCategoryModel])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
