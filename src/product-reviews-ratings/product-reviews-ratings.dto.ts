import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductReviewsRatingDto {
  @IsString()
  @IsNotEmpty()
  review: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsNumber()
  @IsNotEmpty()
  productId: number;
}
