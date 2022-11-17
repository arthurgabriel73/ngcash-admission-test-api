import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { usersProviders } from './users.providers';
import {DatabaseModule} from "../../database.module";


@Module({
    imports: [DatabaseModule],
    controllers: [UsersController],
    providers: [
        ...usersProviders,
        UsersService
    ],
    exports: [UsersService]
})

export class UsersModule {}