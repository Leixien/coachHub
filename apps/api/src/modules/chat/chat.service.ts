import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return 'Chat service - implementation needed';
  }
}

import { Resolver, Query } from '@nestjs/graphql';

@Resolver('Chat')
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => String)
  async getChats(): Promise<string> {
    return 'Chat query - implementation needed';
  }
}
