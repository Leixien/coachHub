import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';

// Controllers
import { AppController } from './app.controller';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { ExercisesModule } from './modules/exercises/exercises.module';
import { ProgramsModule } from './modules/programs/programs.module';
import { WorkoutsModule } from './modules/workouts/workouts.module';
import { ChatModule } from './modules/chat/chat.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { PrismaModule } from './modules/prisma/prisma.module';

// Configuration
import { databaseConfig } from './config/database.config';
import { authConfig } from './config/auth.config';
import { appConfig } from './config/app.config';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig],
      envFilePath: ['.env.local', '.env'],
    }),

    // Rate limiting
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, // 1 minute
          limit: 100, // 100 requests per minute
        },
      ],
    }),

    // GraphQL
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), 'schema.gql'),
        sortSchema: true,
        playground: configService.get('NODE_ENV') === 'development',
        introspection: true,
        context: ({ req, res }) => ({ req, res }),
        cors: {
          origin: [
            'http://localhost:3000',
            'https://*.vercel.app',
            'https://*.fly.dev',
          ],
          credentials: true,
        },
      }),
    }),

    // Application modules
    PrismaModule,
    AuthModule,
    UsersModule,
    OrganizationsModule,
    ExercisesModule,
    ProgramsModule,
    WorkoutsModule,
    ChatModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
