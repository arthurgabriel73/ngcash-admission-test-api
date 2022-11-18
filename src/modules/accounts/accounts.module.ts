import { Module } from '@nestjs/common';
import {DatabaseModule} from "../../database.module";
import {accountsProviders} from "./accounts.providers";
import {AccountsService} from "./services/accounts.service";
import {AccountsController} from "./controllers/accounts.controller";
import {UsersService} from "../users/services/users.service";
import {usersProviders} from "../users/users.providers";


@Module({
    imports: [DatabaseModule],
    controllers: [AccountsController],
    providers: [
        ...accountsProviders,
        ...usersProviders,
        AccountsService,
        UsersService
    ],
    exports: [AccountsService]
})

export class AccountsModule {}