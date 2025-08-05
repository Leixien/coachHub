"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log', 'debug'],
    });
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT') || 3001;
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        disableErrorMessages: false,
    }));
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'https://*.vercel.app',
            'https://*.fly.dev',
        ],
        credentials: true,
    });
    await app.listen(port);
    console.log(`🚀 Coach Hub API is running on: http://localhost:${port}`);
    console.log(`📊 GraphQL Playground: http://localhost:${port}/graphql`);
}
bootstrap();
//# sourceMappingURL=main.js.map