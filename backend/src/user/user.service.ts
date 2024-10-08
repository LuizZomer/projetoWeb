import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { IFindAllParam } from 'src/utils/types';
import { messageGenerator } from 'src/utils/function';

interface IFindAllUser extends IFindAllParam {
  role: string;
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    fullName,
    idnr,
    password,
    role,
    status,
    username,
    function: userFunction,
    workload,
  }: CreateUserDto) {
    const encryptedPassword = bcrypt.hashSync(password, await bcrypt.genSalt());

    const data: CreateUserDto = {
      fullName,
      idnr,
      password: encryptedPassword,
      role,
      status,
      username,
      function: userFunction,
      workload,
    };

    await this.prisma.user.create({
      data: {
        ...data,
      },
    });

    return messageGenerator('create');
  }

  async findAll({ page, take, search, role }: IFindAllUser) {
    const userTableCount = await this.prisma.user.count({
      where: {
        fullName: {
          contains: search || undefined,
        },
        role: {
          equals: role || undefined,
        },
      },
    });

    const count = Math.ceil(userTableCount / take);

    const users = await this.prisma.user.findMany({
      select: {
        Finance: false,
        fullName: true,
        id: true,
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
        role: {
          equals: role || undefined,
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

  async update(
    id: string,
    {
      fullName,
      function: userFunction,
      idnr,
      password,
      role,
      status,
      username,
      workload,
    }: UpdateUserDto,
  ) {
    await this.exist(id);

    const data: UpdateUserDto = {
      fullName,
      function: userFunction,
      idnr,
      role,
      status,
      username,
      workload,
    };

    if (password) {
      const salt = await bcrypt.genSalt();
      data.password = bcrypt.hashSync(password, salt);
    }

    await this.prisma.user.update({
      where: { id },
      data,
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
