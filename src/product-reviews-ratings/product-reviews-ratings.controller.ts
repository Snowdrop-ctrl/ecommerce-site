import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductReviewsRatingsService } from './product-reviews-ratings.service';
import { CreateProductReviewsRatingDto } from './product-reviews-ratings.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('Product Reviews & Ratings')
@Controller('product-reviews-ratings')
export class ProductReviewsRatingsController {
  constructor(private readonly productReviewsRatingsService: ProductReviewsRatingsService) {}


  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth("access-token")
  create(@Req() request, @Body() body: CreateProductReviewsRatingDto) {
    return this.productReviewsRatingsService.create(request.user.id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @ApiBearerAuth("access-token")
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.productReviewsRatingsService.remove(+id);
  }
}
