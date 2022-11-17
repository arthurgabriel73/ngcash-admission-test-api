import {Repository} from "typeorm";
import {Inject, Injectable} from "@nestjs/common";
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
}