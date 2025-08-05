import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findMany(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]>;
    findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    update(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User>;
    delete(where: Prisma.UserWhereUniqueInput): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}
//# sourceMappingURL=users.service.d.ts.map