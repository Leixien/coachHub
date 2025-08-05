import { Resolver, Query } from '@nestjs/graphql';
import { OrganizationsService } from './organizations.service';

@Resolver('Organization')
export class OrganizationsResolver {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Query(() => String)
  async getOrganizations(): Promise<string> {
    return 'Organizations query - implementation needed';
  }
}
