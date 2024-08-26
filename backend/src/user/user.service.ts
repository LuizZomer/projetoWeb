import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { IFindAllParam } from 'src/utils/types';
import { messageGenerator } from 'src/utils/function';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserDto) {
    const encryptedPassword = bcrypt.hashSync(
      user.password,
      await bcrypt.genSalt(),
    );

    await this.prisma.user.create({
      data: {
        ...user,
        password: encryptedPassword,
      },
    });

    return messageGenerator('create');
  }

  async findAll({ page, take, search }: IFindAllParam) {
    const userTableCount = await this.prisma.user.count({
      where: {
        fullName: {
          contains: search || undefined,
        },
      },
    });

    const count = Math.ceil(userTableCount / take);

    if (page >= count) throw new BadRequestException('Pagina não existente');

    const users = await this.prisma.user.findMany({
      select: {
        AccountPayable: false,
        AccountsReceivable: false,
        fullName: true,
        id: true,
        contactId: false,
        createdAt: true,
        function: true,
        idnr: true,
        lastAccess: true,
        password: false,
        Revenue: false,
        role: true,
        status: true,
        updateAt: false,
        username: true,
        workload: true,
      },
      take,
      skip: page * take,
      where: {
        fullName: {
          contains: search || undefined,
        },
      },
    });

    return { users, usersCount: count };
  }

  async findOne(id: string) {
    await this.exist(id);

    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, user: UpdateUserDto) {
    await this.exist(id);

    if (user.password)
      user.password = bcrypt.hashSync(user.password, await bcrypt.genSalt());

    await this.prisma.user.update({
      where: { id },
      data: user,
    });

    return messageGenerator('update');
  }

  async remove(id: string) {
    await this.exist(id);

    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return messageGenerator('delete');
  }

  async exist(id: string) {
    const user = await this.prisma.user.count({
      where: {
        id,
      },
    });

    if (user) {
      return true;
    }

    throw new NotFoundException('Id não existente');
  }
}
