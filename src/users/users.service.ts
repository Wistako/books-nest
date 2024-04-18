import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Password, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  public getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public getById(id: User['id']): Promise<User | null> {
    const user = this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  public getByEmail(
    email: User['email'],
  ): Promise<(User & { password: Password }) | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: { password: true },
    });
  }

  public async create(
    email: User['email'],
    password: Password['hashedPassword'],
  ): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: { email, password: { create: { hashedPassword: password } } },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        console.log(error);
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  public async updateById(
    id: User['id'],
    email: User['email'],
    password: string | undefined,
  ): Promise<User> {
    if (!(await this.getById(id)))
      throw new NotFoundException('User not found');
    if (!password) {
      return this.prisma.user.update({
        where: { id },
        data: { email },
      });
    }
    return this.prisma.user.update({
      where: { id },
      data: {
        email,
        password: { update: { hashedPassword: password } },
      },
    });
  }

  public async deleteById(id: User['id']): Promise<User> {
    if (!(await this.getById(id)))
      throw new NotFoundException('User not found');
    return this.prisma.user.delete({ where: { id } });
  }
}
