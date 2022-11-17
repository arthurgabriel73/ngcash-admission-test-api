import { Module } from '@nestjs/common';
import {UsersModule} from "./modules/users/users.module";
import {AccountsModule} from "./modules/accounts/accounts.module";
import {TransactionsModule} from "./modules/transactions/transactions.module";
import {AuthModule} from "./modules/auth/auth.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AccountsModule,
  TransactionsModule,
  ],
})
export class AppModule {}
