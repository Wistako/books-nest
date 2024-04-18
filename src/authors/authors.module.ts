import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [AuthorsService],
  controllers: [AuthorsController],
  imports: [PrismaModule],
})
export class AuthorsModule {}
