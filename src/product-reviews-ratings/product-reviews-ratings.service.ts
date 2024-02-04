import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ProductReviewRatingModel } from 'src/db/models/product-review-rating';
import { CreateProductReviewsRatingDto } from './product-reviews-ratings.dto';
import { ProductsService } from 'src/products/products.service';
import { ERROR_MESSAGES } from 'src/constants/error.messages';
import { SUCCESS_MESSAGES } from 'src/constants/success.messages';

@Injectable()
export class ProductReviewsRatingsService {
  constructor(
    @Inject(ProductReviewRatingModel)
    private readonly productReviewRatingModel: typeof ProductReviewRatingModel,

    private readonly ProductService: ProductsService,
  ) {}

  async create(userId: number, body: CreateProductReviewsRatingDto) {
    const findProduct = await this.ProductService.findProduct(+body.productId);

    if (!findProduct) {
      throw new HttpException(ERROR_MESSAGES.PRODUCT_NOT_FOUND, 404);
    }

    await this.productReviewRatingModel.query().insert({ ...body, userId });

    return { message: SUCCESS_MESSAGES.REVIEW_ADDED_SUCCESS };
  }

  async remove(id: number) {
    const findReview = await this.productReviewRatingModel.query().findById(id);

    if (!findReview) {
      throw new HttpException(ERROR_MESSAGES.REVIEW_NOT_FOUND, 404);
    }

    await this.productReviewRatingModel.query().deleteById(id);

    return { message: SUCCESS_MESSAGES.REVIEW_REMOVED_SUCCESS };
  }
}
