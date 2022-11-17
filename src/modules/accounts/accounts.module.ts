import { Module } from '@nestjs/common';
import {DatabaseModule} from "../../database.module";
import {accountsProviders} from "./accounts.providers";
import {AccountsService} from "./services/accounts.service";

@Module({
    imports: [DatabaseModule],
    providers: [
        ...accountsProviders,
        AccountsService
    ],
    exports: [AccountsService]
})

export class AccountsModule {}