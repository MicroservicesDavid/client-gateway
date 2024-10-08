import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  Query,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { StatusDto } from './dto/status.dto';
import { NATS_SERVERS } from 'src/common/config';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVERS) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.client.send('findAllOrders', orderPaginationDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('findOneOrder', id).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get('status/:status')
  findByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.client
      .send('findAllOrders', {
        status: statusDto.status,
        ...paginationDto,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body() statusDto: StatusDto) {
    return this.client
      .send('changeOrderStatus', { id, status: statusDto.status })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
