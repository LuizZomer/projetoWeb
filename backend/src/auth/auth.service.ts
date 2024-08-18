import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

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
  ) {}

  async createUserToken(user: User) {
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
}
