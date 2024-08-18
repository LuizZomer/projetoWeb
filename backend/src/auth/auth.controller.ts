import { Body, Controller, Post } from '@nestjs/common';
import { loginUserDTO } from './dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('userLogin')
  async userLogin(@Body() { passsword, username }: loginUserDTO) {
    return;
  }
}
