import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthCustomerGuard } from 'src/guards/authCustomer.guard';
import { AuthGuard } from 'src/guards/authUser.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() customer: CreateCustomerDto) {
    return this.customerService.create(customer);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Query('take', ParseIntPipe) take: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('search') search: string,
    @Query('status') status: string,
  ) {
    return this.customerService.findAll({ page, take, search, status });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() customer: UpdateCustomerDto) {
    return this.customerService.update(id, customer);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
