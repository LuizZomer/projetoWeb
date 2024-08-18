import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginCustomerDTO } from './dto/login-customer';
import { loginUserDTO } from './dto/login-user.dto copy';
import { customerRegisterDTO } from './dto/customer-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('userLogin')
  async userLogin(@Body() { password, username }: loginUserDTO) {
    return this.authService.userLogin({ password, username });
  }

  @Post('customerLogin')
  async customerLogin(@Body() { email, password }: loginCustomerDTO) {
    return this.authService.customerLogin({ email, password });
  }

  @Post('customerRegister')
  async customerRegister(@Body() customer: customerRegisterDTO) {
    return this.authService.customerRegister(customer);
  }
}
