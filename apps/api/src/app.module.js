"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const throttler_1 = require("@nestjs/throttler");
const path_1 = require("path");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const organizations_module_1 = require("./modules/organizations/organizations.module");
const exercises_module_1 = require("./modules/exercises/exercises.module");
const programs_module_1 = require("./modules/programs/programs.module");
const workouts_module_1 = require("./modules/workouts/workouts.module");
const chat_module_1 = require("./modules/chat/chat.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const prisma_module_1 = require("./modules/prisma/prisma.module");
const database_config_1 = require("./config/database.config");
const auth_config_1 = require("./config/auth.config");
const app_config_1 = require("./config/app.config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [database_config_1.databaseConfig, auth_config_1.authConfig, app_config_1.appConfig],
                envFilePath: ['.env.local', '.env'],
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            graphql_1.GraphQLModule.forRootAsync({
                driver: apollo_1.ApolloDriver,
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    autoSchemaFile: (0, path_1.join)(process.cwd(), 'schema.gql'),
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
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            organizations_module_1.OrganizationsModule,
            exercises_module_1.ExercisesModule,
            programs_module_1.ProgramsModule,
            workouts_module_1.WorkoutsModule,
            chat_module_1.ChatModule,
            analytics_module_1.AnalyticsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map