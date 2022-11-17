import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { UsersModule } from "../../../src/modules/users/users.module";
import { AuthModule } from "../../../src/modules/auth/auth.module";


export async function clientFactory(): Promise<INestApplication>{
    let app: INestApplication;

    const moduleRef = await Test.createTestingModule({
        imports: [
            UsersModule,
            AuthModule,
        ],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true
        })
    );

    await app.init()
    
    return app
}