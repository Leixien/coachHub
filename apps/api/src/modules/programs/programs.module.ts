import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsResolver } from './programs.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ProgramsService, ProgramsResolver],
  exports: [ProgramsService],
})
export class ProgramsModule {}
