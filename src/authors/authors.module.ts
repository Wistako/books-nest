import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { PrismaService } from 'src/shared/services/prisma.service';

@Module({
  providers: [AuthorsService, PrismaService],
  controllers: [AuthorsController],
})
export class AuthorsModule {}
