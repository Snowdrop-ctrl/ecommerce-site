import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateProductDto,
  GetProductsDto,
  UpdateProductDto,
} from './products.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @ApiBearerAuth('access-token')
  @Roles(Role.Admin)
  create(@Body() body: CreateProductDto) {
    return this.productsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('access-token')
  findAll(@Query() query: GetProductsDto) {
    return this.productsService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth('access-token')
  findOne(@Param('id') id: string) {
    return this.productsService.findProduct(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @ApiBearerAuth('access-token')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productsService.update(+id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  @ApiBearerAuth('access-token')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
