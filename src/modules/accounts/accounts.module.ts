import { Module } from '@nestjs/common';
import {DatabaseModule} from "../../database.module";
import {accountsProviders} from "./accounts.providers";
import {AccountsService} from "./services/accounts.service";
import {AccountsController} from "./controllers/accounts.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [AccountsController],
    providers: [
        ...accountsProviders,
        AccountsService
    ],
    exports: [AccountsService]
})

export class AccountsModule {}