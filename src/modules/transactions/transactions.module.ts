import { Module } from '@nestjs/common';
import {DatabaseModule} from "../../database.module";
import {TransactionsController} from "./controllers/transactions.controller";
import {transactionsProviders} from "./transactions.providers";
import {TransactionsService} from "./services/transactions.service";
import {AccountsService} from "../accounts/services/accounts.service";
import {UsersService} from "../users/services/users.service";
import {accountsProviders} from "../accounts/accounts.providers";
import {usersProviders} from "../users/users.providers";


@Module({
    imports: [DatabaseModule],
    controllers: [TransactionsController],
    providers: [
        ...transactionsProviders,
        ...accountsProviders,
        ...usersProviders,
        TransactionsService,
        AccountsService,
        UsersService
    ],
    exports: [TransactionsService]
})

export class TransactionsModule {}