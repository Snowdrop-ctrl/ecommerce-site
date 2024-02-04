import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { toNumber } from "src/utils/cast.helper";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    sku?: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    @IsNumber()
    stock: number

    @IsNotEmpty()
    @IsString()
    imageKey: string

    @IsNotEmpty()
    @IsString()
    currency: string

    @IsNotEmpty()
    @IsNumber()
    categoryId: number
}

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    sku?: string

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsNumber()
    price: number

    @IsOptional()
    @IsNumber()
    stock: number

    @IsOptional()
    @IsString()
    imageKey: string

    @IsOptional()
    @IsString()
    currency: string

    @IsOptional()
    @IsNumber()
    categoryId: number
}

export class GetProductsDto {
    @Transform(({ value }) => toNumber(value, { default: 0, min: 0 }))
    @IsNumber()
    @IsOptional()
    categoryId?: number

    @IsNumber()
    @IsOptional()
    priceStart?: number

    @IsNumber()
    @IsOptional()
    priceEnd?: number


    @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
    @IsOptional()
    @IsNumber()
    page?: number;

    @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
    @IsOptional()
    @IsNumber()
    limit?: number;
}