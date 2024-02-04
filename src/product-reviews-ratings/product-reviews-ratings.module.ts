import { Module } from '@nestjs/common';
import { ProductReviewsRatingsService } from './product-reviews-ratings.service';
import { ProductReviewsRatingsController } from './product-reviews-ratings.controller';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { ProductReviewRatingModel } from 'src/db/models/product-review-rating';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ObjectionModule.forFeature([ProductReviewRatingModel]), ProductsModule],
  controllers: [ProductReviewsRatingsController],
  providers: [ProductReviewsRatingsService],
})
export class ProductReviewsRatingsModule {}
