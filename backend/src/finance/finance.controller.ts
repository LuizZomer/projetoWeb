import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreatePayableAccountDTO } from './dto/create/create-payable-account.dto copy';
import { FinanceService } from './finance.service';
import { AuthGuard } from 'src/guards/authUser.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Roles(Role.ADMIN, Role.FINANCIAL)
@UseGuards(AuthGuard, RoleGuard)
@Controller('finance')
export class FinanceController {
  constructor(private readonly financesService: FinanceService) {}

  @Post('payable')
  createPayableAccount(
    @Req() req: any,
    @Body() payableAccount: CreatePayableAccountDTO,
  ) {
    const user = req.user.id;

    return this.financesService.createPayableAccount(payableAccount, user);
  }
}
