import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Author } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Author[]> {
    return this.prismaService.author.findMany();
  }

  public getById(id: Author['id']): Promise<Author> {
    return this.prismaService.author.findUnique({
      where: {
        id,
      },
    });
  }

  public async create(data: Omit<Author, 'id'>): Promise<Author> {
    try {
      return await this.prismaService.author.create({
        data,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Author already exists');
      }
      throw error;
    }
  }

  public async updateById(
    id: Author['id'],
    data: Omit<Author, 'id'>,
  ): Promise<Author> {
    const author = await this.prismaService.author.findUnique({
      where: { id },
    });
    if (!author) throw new NotFoundException('Author not found');
    try {
      return await this.prismaService.author.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Author already exists');
      }
      throw error;
    }
  }

  public async deleteById(id: Author['id']): Promise<Author> {
    return await this.prismaService.author.delete({
      where: { id },
    });
  }
}
