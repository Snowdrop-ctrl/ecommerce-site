import { Transform } from "class-transformer";
import { toNumber } from "./cast.helper";
import { IsNumber, IsOptional } from "class-validator";

export class PaginationAndSearchDto {
    @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
    @IsOptional()
    @IsNumber()
    page?: number;
  
    @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
    @IsOptional()
    @IsNumber()
    limit?: number;
  }