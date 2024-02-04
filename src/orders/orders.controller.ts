import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import {
  OrderHistoryDto,
  OrderPlaceDto,
  OrderStatuUpdateDto,
  OrdersListDto,
} from './orders.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { query } from 'express';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/place')
  @ApiBearerAuth('access-token')
  create(@Req() request, @Body() body: OrderPlaceDto) {
    return this.ordersService.create(request.user.id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/all')
  @ApiBearerAuth('access-token')
  @Roles(Role.Admin)
  getAll(@Req() request, @Query() query: OrdersListDto) {
    return this.ordersService.getAll(query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/status/update/:id')
  @ApiBearerAuth('access-token')
  @Roles(Role.Admin)
  changeStatus(
    @Req() request,
    @Param('id') id: string,
    @Body() body: OrderStatuUpdateDto,
  ) {
    return this.ordersService.changeStatus(+id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/history')
  @ApiBearerAuth('access-token')
  getHistory(@Req() request, @Query() query: OrderHistoryDto) {
    return this.ordersService.getUserOrderHistory(request.user.id, query);
  }
}
