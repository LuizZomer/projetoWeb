import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';

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
    @Query('search') search: string,
    @Query('type') type: string,
    @Query('size') size: string,
  ) {
    return this.menuService.findAll({ take, page, search, size, type });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() item: UpdateMenuDto) {
    return this.menuService.update(id, item);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
