import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError } from 'rxjs';

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

    return { message: 'Criado com sucesso!' };
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
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
        Finance: false,
      },
    });
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

    return { message: 'Atualizado com sucesso!' };
  }

  async remove(id: string) {
    await this.exist(id);

    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return { message: 'Deletado com sucesso!' };
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
