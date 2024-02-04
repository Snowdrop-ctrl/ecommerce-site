import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { OrderHistoryDto, OrderPlaceDto } from './orders.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/place')
  @ApiBearerAuth('access-token')
  create(@Req() request, @Body() body: OrderPlaceDto) {
    return this.ordersService.create(request.user.id , body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/history')
  @ApiBearerAuth('access-token')
  getHistory(@Req() request, @Query() query: OrderHistoryDto) {
    return this.ordersService.getUserOrderHistory(request.user.id, query);
  }
}
