import { Resolver, Query } from '@nestjs/graphql';
import { ProgramsService } from './programs.service';

@Resolver('Program')
export class ProgramsResolver {
  constructor(private readonly programsService: ProgramsService) {}

  @Query(() => String)
  async getPrograms(): Promise<string> {
    return 'Programs query - implementation needed';
  }
}
