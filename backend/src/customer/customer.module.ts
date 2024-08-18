import { forwardRef, Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => UserModule)],
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService],
  exports: [CustomerService],
})
export class CustomerModule {}
