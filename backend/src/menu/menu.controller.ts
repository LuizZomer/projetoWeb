import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';
import { AuthGuard } from 'src/guards/authUser.guard';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @UseGuards(AuthGuard)
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
    @Query('status') status: string,
  ) {
    return this.menuService.findAll({ take, page, search, size, type, status });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() item: UpdateMenuDto) {
    return this.menuService.update(id, item);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Patch('status/:id')
  switchStatus(@Param('id') id: string) {
    return this.menuService.switchStatus(id);
  }
}
