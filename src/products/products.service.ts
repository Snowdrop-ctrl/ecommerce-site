import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ProductModel } from 'src/db/models/product.model';
import { GetProductsDto } from './products.dto';
import { ProductCategoryModel } from 'src/db/models/product-category.model';
import { ERROR_MESSAGES } from 'src/constants/error.messages';

@Injectable()
export class ProductsService {

  constructor(
    @Inject(ProductModel)
    private readonly productModel: typeof ProductModel,
    @Inject(ProductCategoryModel)
    private readonly categoryModel: typeof ProductCategoryModel
  ){}

  create(createProductDto: any) {
    return 'This action adds a new product';
  }

  async findAll(query: GetProductsDto) {

    const {page=1, limit=10, categoryId, priceStart, priceEnd} = query;

    const productQueryBuilder = this.productModel
    .query()
    .withGraphJoined('category')
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

    return await productQueryBuilder;
  }

  async findOne(id: number) {

    const singleProduct = await this.productModel.query().findById(id)

    if(!singleProduct){
      throw new HttpException(ERROR_MESSAGES.PRODUCT_NOT_FOUND,404)
    }

    return singleProduct;
  }

  update(id: number, updateProductDto: any) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    const singleProduct = await this.productModel.query().findById(id)

    if(!singleProduct){
      throw new HttpException(ERROR_MESSAGES.PRODUCT_NOT_FOUND,404)
    }

    return singleProduct;
    return `This action removes a #${id} product`;
  }
}
