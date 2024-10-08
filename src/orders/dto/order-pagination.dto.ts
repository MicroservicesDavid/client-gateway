import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { orderEnum } from '../enums/order.enum';
import { orderType } from './create-order.dto';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(orderEnum, {
    message: `Order status must be one of ${Object.values(orderEnum)}`,
  })
  status?: orderType;
}
