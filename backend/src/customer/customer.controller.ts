import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AuthCustomerGuard } from 'src/guards/authCustomer.guard';
import { AuthGuard } from 'src/guards/authUser.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
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
  ) {
    return this.customerService.findAll({ page, take, search });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @UseGuards(AuthCustomerGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() customer: UpdateCustomerDto) {
    return this.customerService.update(id, customer);
  }

  @UseGuards(AuthCustomerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
