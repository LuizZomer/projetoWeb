import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Customer, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { loginUserDTO } from './dto/login-user.dto copy';
import { loginCustomerDTO } from './dto/login-customer';
import { customerRegisterDTO } from './dto/customer-register.dto';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class AuthService {
  private user = {
    issuer: 'userLogin',
    audience: 'user',
  };

  private customer = {
    issuer: 'customerLogin',
    audience: 'customer',
  };

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly customerService: CustomerService,
  ) {}

  createUserToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          username: user.username,
        },
        {
          expiresIn: '1 days',
          subject: String(user.id),
          issuer: this.user.issuer,
          audience: this.user.audience,
        },
      ),
    };
  }

  checkUserToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.user.issuer,
        audience: this.user.audience,
      });

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  isValidUserToken(token: string) {
    try {
      this.checkUserToken(token);

      return true;
    } catch {
      return false;
    }
  }

  async userLogin({ password, username }: loginUserDTO) {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) throw new NotFoundException('Email e/ou senha incorreta!');

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Email e/ou senha incorreta!');

    return this.createUserToken(user);
  }

  createCustomerToken(customer: Customer) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: customer.id,
          email: customer.email,
        },
        {
          expiresIn: '3 days',
          subject: String(customer.id),
          issuer: this.customer.issuer,
          audience: this.customer.audience,
        },
      ),
    };
  }

  checkCustomerToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.customer.issuer,
        audience: this.customer.audience,
      });

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  isValidCustomerToken(token: string) {
    try {
      this.checkCustomerToken(token);

      return true;
    } catch {
      return false;
    }
  }

  async customerLogin({ password, email }: loginCustomerDTO) {
    const customer = await this.prisma.customer.findFirst({
      where: {
        email,
      },
    });

    if (!customer) throw new NotFoundException('Email e/ou senha incorreta!');

    if (!(await bcrypt.compare(password, customer.password)))
      throw new UnauthorizedException('Email e/ou senha incorreta!');

    return this.createCustomerToken(customer);
  }

  async customerRegister(customer: customerRegisterDTO) {
    const encryptedPassword = bcrypt.hashSync(
      customer.password,
      await bcrypt.genSalt(),
    );

    await this.prisma.customer.create({
      data: {
        ...customer,
        password: encryptedPassword,
        loyalty_points: 0,
        status: true,
      },
    });

    return { message: 'Criado com sucesso' };
  }
}
