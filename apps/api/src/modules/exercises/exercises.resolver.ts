import { Resolver, Query } from '@nestjs/graphql';
import { ExercisesService } from './exercises.service';

@Resolver('Exercise')
export class ExercisesResolver {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Query(() => String)
  async getExercises(): Promise<string> {
    return 'Exercises query - implementation needed';
  }
}
