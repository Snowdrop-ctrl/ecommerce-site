import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateCartDto } from './cart.dto';
import { CartItemModel } from 'src/db/models/cart-item.model';
import { SUCCESS_MESSAGES } from 'src/constants/success.messages';
import { ERROR_MESSAGES } from 'src/constants/error.messages';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CartService {

  constructor(

    private readonly producSerice: ProductsService,

    @Inject(CartItemModel)
    private readonly cartItemModel: typeof CartItemModel
  ){}

  async create(body: CreateCartDto, userId: number) {

    if(!body.quantity) {
      throw new HttpException(ERROR_MESSAGES.QUANTITY_NOT_VALID, 400)
    }

    const findProductAlreadyInCart = await this.cartItemModel
    .query()
    .where('userId', userId)
    .andWhere('productId', body.productId)
    .first()

    if(findProductAlreadyInCart) {
      throw new HttpException(ERROR_MESSAGES.PRODUCT_ALREADY_EXIST_IN_CART, 409)
    }

    const findProduct = await this.producSerice.findProduct(body.productId)
    if(!findProduct) {
      throw new HttpException(ERROR_MESSAGES.PRODUCT_NOT_FOUND, 404)
    }
    await this.cartItemModel.query().insert({...body, userId })

    return {message: SUCCESS_MESSAGES.ITEM_ADDED_IN_CART};
  }

  async get(userId: number) {
    const gerUserCartData =  await this.cartItemModel.query().where('userId', userId )
    return gerUserCartData;
  }

  async remove(id: number) {
    const findCartItem = await this.cartItemModel.query().findById(id);

    if(!findCartItem) {
      throw new HttpException(ERROR_MESSAGES.CART_ITEM_NOT_FOUND, 404)
    }

    await this.cartItemModel.query().deleteById(id)

    return {message: SUCCESS_MESSAGES.ITEM_REMOVED_FROM_CART};
  }
}
