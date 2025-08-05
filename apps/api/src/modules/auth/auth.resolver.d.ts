import { AuthService } from './auth.service';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    login(email: string, password: string): Promise<string>;
    register(email: string, password: string, firstName: string, lastName: string, organizationId: string): Promise<string>;
}
//# sourceMappingURL=auth.resolver.d.ts.map