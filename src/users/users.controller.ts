import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  getAll() {
    return this.userService.getAll();
  }

  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: User['id']) {
    return this.userService.getById(id);
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: User['id']) {
    if (!(await this.userService.getById(id)))
      throw new NotFoundException('User not found');
    return this.userService.deleteById(id);
  }
}
