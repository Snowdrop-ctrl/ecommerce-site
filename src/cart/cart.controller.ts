import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './cart.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@ApiTags('Carts')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('access-token')
  create(@Req() request, @Body() body: CreateCartDto) {
    return this.cartService.create(body, request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('access-token')
  get(@Req() request) {
    return this.cartService.get(request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth('access-token')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
