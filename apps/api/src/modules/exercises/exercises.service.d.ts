import { PrismaService } from '../prisma/prisma.service';
export declare class ExercisesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<string>;
}
export declare class ExercisesResolver {
    private readonly exercisesService;
    constructor(exercisesService: ExercisesService);
    getExercises(): Promise<string>;
}
//# sourceMappingURL=exercises.service.d.ts.map