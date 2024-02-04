import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ProductModel } from 'src/db/models/product.model';
import { CreateProductDto, GetProductsDto, UpdateProductDto } from './products.dto';
import { ProductCategoryModel } from 'src/db/models/product-category.model';
import { ERROR_MESSAGES } from 'src/constants/error.messages';
import { SUCCESS_MESSAGES } from 'src/constants/success.messages';

@Injectable()
export class ProductsService {

  constructor(
    @Inject(ProductModel)
    private readonly productModel: typeof ProductModel,
    @Inject(ProductCategoryModel)
    private readonly categoryModel: typeof ProductCategoryModel
  ){}

  async create(body: CreateProductDto) {
    const { categoryId, currency, description, imageKey, name, price, stock, sku } = body

    const findCategory = await this.categoryModel.query().findById(categoryId);

    if(!findCategory) {
      throw new HttpException(ERROR_MESSAGES.CATEGORY_NOT_EXIST, 404)
    }
    await this.productModel.query().insert({name, price, sku, description, currency,stock, imageKey, categoryId})

    return {message: SUCCESS_MESSAGES.PRODUCT_CREATED_SUCCESS}
  }

  async findAll(query: GetProductsDto) {

    const {page=1, limit=10, categoryId, priceStart, priceEnd} = query;

    const productQueryBuilder = this.productModel
    .query()
    .withGraphJoined('category')
    .withGraphJoined('productReviewRatings')
    .limit(limit)
    .offset((page - 1) * limit);

    if(categoryId) {
      const findCategory = await this.categoryModel.query().findById(categoryId)
      if(!findCategory) {
        throw new HttpException(ERROR_MESSAGES.CATEGORY_NOT_EXIST,404)
      }
      productQueryBuilder.where('categoryId', +categoryId)
    }

    if(priceStart && priceEnd) {
      productQueryBuilder.whereBetween('price',[priceStart, priceEnd]);
    }

    const totalProduct = (await this.productModel
      .query()
      .clone()
      .count('id')
      .first()) as unknown as {count: string}

    return {
      items: await productQueryBuilder,
      total: parseInt(totalProduct.count || '0'),
    };
  }

  async findProduct(id: number) {
    const singleProduct = await this.productModel.query()
    .withGraphJoined('category')
    .withGraphJoined('productReviewRatings').findById(id)

    if(!singleProduct){
      throw new HttpException(ERROR_MESSAGES.PRODUCT_NOT_FOUND,404)
    }

    return singleProduct;
  }

  async update(id: number, body: UpdateProductDto) {
    const { categoryId, currency, description, imageKey, name, price, stock, sku } = body

    const findProduct = await this.findProduct(id)
    if(!findProduct) {
      throw new HttpException(ERROR_MESSAGES.PRODUCT_NOT_FOUND,404)
    }

    if(categoryId) {
      const findCategory = await this.categoryModel.query().findById(categoryId);
      if(!findCategory) {
        throw new HttpException(ERROR_MESSAGES.CATEGORY_NOT_EXIST, 404)
      }
    }
    
    await this.productModel.query().update({name, price, sku, description, currency,stock, imageKey, categoryId}).where('id', id)

    return {message: SUCCESS_MESSAGES.PRODUCT_UPDATE_SUCCESS}
  }

  async remove(id: number) {
    const singleProduct = await this.findProduct(id)

    if(!singleProduct){
      throw new HttpException(ERROR_MESSAGES.PRODUCT_NOT_FOUND,404)
    }

    await this.productModel.query().deleteById(id)

    return singleProduct;
  }
}
