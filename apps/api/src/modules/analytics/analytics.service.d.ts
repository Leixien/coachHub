import { PrismaService } from '../prisma/prisma.service';
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<string>;
}
export declare class AnalyticsResolver {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getAnalytics(): Promise<string>;
}
//# sourceMappingURL=analytics.service.d.ts.map