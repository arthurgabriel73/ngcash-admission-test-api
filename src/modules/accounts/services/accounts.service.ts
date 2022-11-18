import {Repository} from "typeorm";
import {forwardRef, Inject, Injectable, NotFoundException} from "@nestjs/common";
import {Account} from "../entities/accounts.entity";
import {UsersService} from "../../users/services/users.service";
require('dotenv').config();

@Injectable()
export class AccountsService {
    private initialBalance = Number(process.env.INITIAL_BALANCE)

    @Inject('ACCOUNTS_REPOSITORY')
    private accountsRepository: Repository<Account>

    constructor(
        @Inject(forwardRef(() => UsersService))
        private usersService: UsersService
    ) {}

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

    async findOneAccountByUsername(username: string): Promise<Account> {
        const user = await this.usersService.findOne(username)
        if (!user) {
            throw new NotFoundException('Account not found.')
        }

        return await this.accountsRepository.findOne({ where: {
            id: user.account.id
            }})
    }

    async findAccountById(accountId: number): Promise<Account> {
        return await this.accountsRepository.findOne({ where: {
            id: accountId
            }})
    }

}