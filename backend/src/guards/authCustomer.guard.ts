import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class AuthCustomerGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly customerService: CustomerService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const { authorization } = req.headers;

    try {
      const data = this.authService.checkCustomerToken(
        (authorization ?? '').split(' ')[1],
      );

      req.tokenPayload = data;

      req.customer = await this.customerService.findOne(data.id);

      return true;
    } catch {
      return false;
    }
  }
}
