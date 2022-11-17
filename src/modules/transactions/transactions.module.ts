import { Module } from '@nestjs/common';
import {DatabaseModule} from "../../database.module";
import {TransactionsController} from "./controllers/transactions.controller";
import {transactionsProviders} from "./transactions.providers";
import {TransactionsService} from "./services/transactions.service";


@Module({
    imports: [DatabaseModule],
    controllers: [TransactionsController],
    providers: [
        ...transactionsProviders,
        TransactionsService
    ],
    exports: [TransactionsService]
})

export class TransactionsModule {}