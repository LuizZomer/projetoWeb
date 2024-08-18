import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => UserModule),
    forwardRef(() => CustomerModule),
    JwtModule.register({
      secret: 'sdnfkjdsfkjdhsjkfhsdkjfhsdkjfhkjdsfhkjdsfkjdsfhdskjfh',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
