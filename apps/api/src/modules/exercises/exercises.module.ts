import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesResolver } from './exercises.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ExercisesService, ExercisesResolver],
  exports: [ExercisesService],
})
export class ExercisesModule {}
