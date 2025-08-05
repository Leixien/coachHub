import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsResolver } from './workouts.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [WorkoutsService, WorkoutsResolver],
  exports: [WorkoutsService],
})
export class WorkoutsModule {}
