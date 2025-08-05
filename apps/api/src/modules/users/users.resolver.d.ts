import { UsersService } from './users.service';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<string>;
    createUser(input: any): Promise<string>;
}
//# sourceMappingURL=users.resolver.d.ts.map