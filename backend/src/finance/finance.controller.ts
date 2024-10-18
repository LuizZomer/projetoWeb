import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FinanceService } from './finance.service';
import { AuthGuard } from 'src/guards/authUser.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { CreateFinanceDTO } from './dto/create-payable-account.dto copy';
import { UpdateFinanceDTO } from './dto/update-payable-account.dto copy 2';

@Roles(Role.ADMIN, Role.FINANCIAL)
@UseGuards(AuthGuard, RoleGuard)
@Controller('finance')
export class FinanceController {
  constructor(private readonly financesService: FinanceService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('status') status: string,
    @Query('type') type: string,
  ) {    
    return this.financesService.findAllFinance({ page, take, status, type });
  }

  @Get('data')
  async FinanceData(){
    return this.financesService.calcIncomeExpected()
  }

  @Post()
  async create(@Req() req: any, @Body() finance: CreateFinanceDTO) {
    const userId = req.user.id;

    return this.financesService.createFinance(finance, userId);
  }

  @Patch(':financeId')
  async update(
    @Param('financeId') financeId: string,
    @Req() req: any,
    @Body() finance: UpdateFinanceDTO,
  ) {
    const userId = req.user.id;

    return this.financesService.updateFinance({
      finance,
      id: financeId,
      userId,
    });
  }

  @Delete(':financeId')
  async delete(@Param('financeId') id: string) {
    return this.financesService.delete(id);
  }
}
