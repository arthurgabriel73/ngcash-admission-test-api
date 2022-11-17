import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { usersProviders } from './users.providers';
import {DatabaseModule} from "../../database.module";
import {AccountsModule} from "../accounts/accounts.module";


@Module({
    imports: [DatabaseModule, AccountsModule],
    controllers: [UsersController],
    providers: [
        ...usersProviders,
        UsersService
    ],
    exports: [UsersService]
})

export class UsersModule {}