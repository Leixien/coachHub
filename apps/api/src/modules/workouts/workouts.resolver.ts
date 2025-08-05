import { Resolver, Query } from '@nestjs/graphql';
import { WorkoutsService } from './workouts.service';

@Resolver('Workout')
export class WorkoutsResolver {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Query(() => String)
  async getWorkouts(): Promise<string> {
    return 'Workouts query - implementation needed';
  }
}
