import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [MenuController],
  providers: [MenuService, PrismaService],
})
export class MenuModule {}
