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
import { BooksService } from './books.service';
import { Book } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get('/')
  getAll() {
    return this.bookService.getAll();
  }

  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: Book['id']) {
    const book = this.bookService.getById(id);
    if (!book) throw new NotFoundException('Book not found');
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  create(@Body() data: CreateBookDto) {
    return this.bookService.create(data);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  updateById(
    @Param('id', new ParseUUIDPipe()) id: Book['id'],
    @Body() data: CreateBookDto,
  ) {
    return this.bookService.updateById(id, data);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id', new ParseUUIDPipe()) id: Book['id']) {
    if (!(await this.bookService.getById(id)))
      throw new NotFoundException('Book not found');
    await this.bookService.deleteById(id);
    return { success: true };
  }
}
