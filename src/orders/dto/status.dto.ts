import { IsEnum, IsOptional } from 'class-validator';
import { orderType } from './create-order.dto';
import { orderEnum } from '../enums/order.enum';

export class StatusDto {
  @IsOptional()
  @IsEnum(orderEnum, {
    message: `Order status must be one of ${Object.values(orderEnum)}`,
  })
  status?: orderType;
}
