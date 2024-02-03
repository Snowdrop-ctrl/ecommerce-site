import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

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
    @IsNumber()
    @IsOptional()
    categoryId?: number

    @IsNumber()
    @IsOptional()
    priceStart?: number

    @IsNumber()
    @IsOptional()
    priceEnd?: number


    @IsOptional()
    @IsNumber()
    page?: number;

    @IsOptional()
    @IsNumber()
    limit?: number;
}