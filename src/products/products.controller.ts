import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Body,
  Inject,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { NATS_SERVERS } from 'src/common/config';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVERS) private readonly client: ClientProxy) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: 'createProduct' }, createProductDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'findAllProducts' }, paginationDto);
  }

  @Get(':id')
  async findOneProduct(@Param('id') id: string) {
    return this.client.send({ cmd: 'findOneProduct' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    return this.client.send({ cmd: 'removeProduct' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch()
  updateProduct(@Body() updateProductDto: UpdateProductDto) {
    return this.client.send({ cmd: 'updateProduct' }, updateProductDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
