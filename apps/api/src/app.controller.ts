import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return '🚀 Coach Hub API is running! Visit /graphql for GraphQL Playground';
  }

  @Get('health')
  getHealth(): object {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      service: 'Coach Hub API',
      version: '1.0.0'
    };
  }
}
