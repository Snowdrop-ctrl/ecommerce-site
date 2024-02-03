import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    sku?: string

    @IsOptional()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    @IsNumber()
    stock: number

    @IsOptional()
    @IsString()
    imageKey: string

    @IsOptional()
    @IsString()
    currency: string

    @IsNotEmpty()
    @IsString()
    categoryId: string
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