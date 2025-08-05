import { Resolver, Query } from '@nestjs/graphql';
import { AnalyticsService } from './analytics.service';

@Resolver('Analytics')
export class AnalyticsResolver {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Query(() => String)
  async getAnalytics(): Promise<string> {
    return 'Analytics query - implementation needed';
  }
}
