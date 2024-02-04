import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, ValidateIf, ValidateNested } from "class-validator"
import { OrderStatus, PaymentMode } from "src/db/models/order.model"

class CartItems {
    @IsNumber()
    @IsNotEmpty()
    productId: number

    @IsNumber()
    @IsNotEmpty()
    ammount: number

    @IsNumber()
    @IsNotEmpty()
    quantity: number
}

export class OrderPlaceDto {
    @IsArray()
    @ValidateNested({each: true})
    @IsNotEmpty()
    products: CartItems[]

    @IsObject({ each: true })
    @IsNotEmpty()
    billingInfo: Record<string, any>

    @IsEnum(PaymentMode, {
        message: () =>
          `Payment mode must be one of ${Object.values(PaymentMode).join(', ')}`,
      })
    @IsNotEmpty()
    paymentMode: PaymentMode
}


export class OrderHistoryDto {
    @IsEnum(OrderStatus, {
        message: `Status mode must be one of ${Object.values(OrderStatus).join(', ')}`,
    })
    @IsOptional()
    status?: OrderStatus
}