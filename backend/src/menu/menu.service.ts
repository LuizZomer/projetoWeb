import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IFindAllParam } from 'src/utils/types';
import { messageGenerator } from 'src/utils/function';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService){}

  async create(item: CreateMenuDto) {
    await this.prisma.menu.create({
      data:item
    })

    return messageGenerator('create')
  }

  async findAll({page, take}:IFindAllParam) {
    const menu = await this.prisma.menu.count()
    const count = Math.ceil(menu / take)

    if(page > count) throw new BadRequestException("Página não existente")

    const menuItens = await this.prisma.menu.findMany({
      skip: page * take,
      take,
    })

    return {menuItens, itensCount: count};
  }

  async findOne(id: string) {
    await this.exist(id)

    return this.prisma.menu.findUnique({
      where: {
        id,
      },
    });

  }

  async update(id: string, item: UpdateMenuDto) {
    await this.exist(id);


    await this.prisma.menu.update({
      where: { id },
      data: item,
    });

    return messageGenerator('update');
  }

  async remove(id: string) {
    await this.exist(id);

    await this.prisma.menu.delete({
      where: {
        id,
      },
    });

    return messageGenerator('delete');
  }

  async exist(id: string) {
    const user = await this.prisma.menu.count({
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
