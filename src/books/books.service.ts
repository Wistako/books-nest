import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Book[]> {
    return this.prismaService.book.findMany({ include: { author: true } });
  }

  public async getById(id: Book['id']): Promise<Book> | null {
    return this.prismaService.book.findUnique({
      where: {
        id,
      },
      include: { author: true },
    });
  }

  public async create(
    data: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Book> {
    try {
      return await this.prismaService.book.create({ data });
    } catch (error) {
      console.log(error);
      if (error.code === 'P2002') {
        throw new ConflictException('Book already exists');
      }
      throw error;
    }
  }

  public async updateById(
    id: Book['id'],
    data: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Book> {
    const book = await this.prismaService.book.findUnique({
      where: { id },
    });
    if (!book) throw new NotFoundException('Book not found');
    try {
      return await this.prismaService.book.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Book already exists');
      }
      throw error;
    }
  }

  public async deleteById(id: Book['id']): Promise<Book> {
    return await this.prismaService.book.delete({
      where: { id },
    });
  }
}
