import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from '@prisma/client';
import { CreateAuthorDTO } from './dto/create-author.dto';
import { UpdateAuthorDTO } from './dto/update-author.dtio';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get('/')
  getAll() {
    return this.authorsService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: Author['id']) {
    const author = this.authorsService.getById(id);
    if (!author) throw new NotFoundException('Author not found');
    return author;
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  create(@Body() data: CreateAuthorDTO) {
    return this.authorsService.create(data);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  updateById(
    @Param('id', new ParseUUIDPipe()) id: Author['id'],
    @Body() data: UpdateAuthorDTO,
  ) {
    return this.authorsService.updateById(id, data);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id', new ParseUUIDPipe()) id: Author['id']) {
    if (!(await this.authorsService.getById(id)))
      throw new NotFoundException('Author not found');
    await this.authorsService.deleteById(id);
    return { success: true };
  }
}
