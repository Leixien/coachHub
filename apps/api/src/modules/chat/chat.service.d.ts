import { PrismaService } from '../prisma/prisma.service';
export declare class ChatService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<string>;
}
export declare class ChatResolver {
    private readonly chatService;
    constructor(chatService: ChatService);
    getChats(): Promise<string>;
}
//# sourceMappingURL=chat.service.d.ts.map