import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() item: CreateMenuDto) {
    return this.menuService.create(item);
  }

  @Get()
  findAll(
    @Query('take', ParseIntPipe) take: number,
    @Query('page', ParseIntPipe) page: number,

  ) {
    return this.menuService.findAll({take, page});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() item: UpdateMenuDto) {
    return this.menuService.update(id, item);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
