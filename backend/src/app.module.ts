import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { ContactModule } from './contact/contact.module';
import { FinanceModule } from './finance/finance.module';
import { RevenueModule } from './revenue/revenue.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    CustomerModule,
    AuthModule,
    MenuModule,
    ContactModule,
    FinanceModule,
    RevenueModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
