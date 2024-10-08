// import {
//   IsEnum,
//   IsNumber,
//   IsPositive,
//   IsInt,
//   Min,
//   IsBoolean,
//   IsOptional,
// } from 'class-validator';
// import { orderEnum } from '../enums/order.enum';

import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { OrderItemDto } from './order-item.dto';
import { Type } from 'class-transformer';

export type orderType = 'PENDING' | 'DELIVERED' | 'CANCELLED';

// export class CreateOrderDto {
//   @IsNumber()
//   @IsPositive()
//   totalAmount: number;

//   @IsInt()
//   @Min(1)
//   totalItem: number;

//   @IsEnum(orderEnum, {
//     message: `Order status must be one of ${Object.values(orderEnum)}`,
//   })
//   status: orderType = 'PENDING';

//   @IsBoolean()
//   @IsOptional()
//   paid: boolean = false;
// }

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
