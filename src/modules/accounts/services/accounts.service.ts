import {Repository} from "typeorm";
import {Inject, Injectable, NotFoundException} from "@nestjs/common";
import {Account} from "../entities/accounts.entity";
require('dotenv').config();

@Injectable()
export class AccountsService {
    private initialBalance = Number(process.env.INITIAL_BALANCE)

    @Inject('ACCOUNTS_REPOSITORY')
    private accountsRepository: Repository<Account>

    async createNewAccount(): Promise<Account> {
        const newAccount = await this.accountsRepository.create({
            balance: this.initialBalance
        })

        return await this.accountsRepository.save(newAccount)
    }

    async getBalance(accountId: number) {
        const account = await this.accountsRepository.findOne({
            where: {id: accountId}
        })

        if (!account) {
            throw new NotFoundException('Account not found.')
        }

        return {"account_balance": `${account.balance}`}
    }
}