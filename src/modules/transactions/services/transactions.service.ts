import {Between, Brackets, Repository, SelectQueryBuilder} from "typeorm";
import {BadRequestException, Inject, Injectable, NotAcceptableException} from "@nestjs/common";
import {Transaction} from "../entities/transactions.entity";
import {GetFilteredTransactionsDto} from "../dtos/get-filtered-transactions.dto";
import {CashOutDto} from "../dtos/cash-out.dto";
import {AccountsService} from "../../accounts/services/accounts.service";
import {Account} from "../../accounts/entities/accounts.entity";
import {TransactionsEnum} from "../../../enums/transactions-enum";

@Injectable()
export class TransactionsService {
    @Inject('TRANSACTIONS_REPOSITORY')
    private transactionsRepository: Repository<Transaction>

    @Inject('ACCOUNTS_REPOSITORY')
    private accountsRepository: Repository<Account>

    constructor(private accountsService: AccountsService) {}

    async create(data: CashOutDto, currentAccountId: number, targetUsername: string): Promise<Transaction> {
        const targetAccount = await this.accountsService.findOneAccountByUsername(targetUsername)
        const currentAccount = await this.accountsService.findAccountById(currentAccountId)

        if (targetAccount.id === currentAccount.id) {
            throw new NotAcceptableException('Please, choose a valid target account.')
        }

        currentAccount.balance = currentAccount.balance - data.value
        targetAccount.balance = targetAccount.balance + data.value

        if (currentAccount.balance < 0) {
            throw new NotAcceptableException('Account out of founds.')
        }

        let newTransaction = new Transaction()
        newTransaction.debitedAccount = currentAccount
        newTransaction.creditedAccount = targetAccount
        newTransaction.value = data.value


        await this.accountsRepository.save(currentAccount)
        await this.accountsRepository.save(targetAccount)

        return await this.transactionsRepository.save(newTransaction)
    }

    async getFilteredTransactions(data: GetFilteredTransactionsDto, currentAccountId: number): Promise<Transaction[]> {
        let day: Date = null

        if (data.day) {
            day = new Date(Number(data.day))
        }

        if (data.type === TransactionsEnum.CASH_IN) {
            return await this.getCashInFilteredByDay(currentAccountId, day)
        }

        if (data.type === TransactionsEnum.CASH_OUT) {
            return await this.getCashOutFilteredByDay(currentAccountId, day)
        }

        return await this.findAllUsersTransactions(currentAccountId, day)
    }

    async getCashInFilteredByDay(currentAccountId: number, day: Date): Promise<Transaction[]> {
        if (day) {
            return await this.transactionsRepository
                .createQueryBuilder("Transaction")
                .where(`Transaction.createdAt = :day`, {day})
                .andWhere(new Brackets((qb) => {
                    qb.where("Transaction.creditedAccount = :currentAccountId", { currentAccountId })
                }),).getMany()
        }
        return await this.transactionsRepository
            .createQueryBuilder("Transaction")
            .andWhere(`Transaction.creditedAccount = :currentAccountId;`, { currentAccountId })
            .getMany()
    }

    async getCashOutFilteredByDay(currentAccountId: number, day: Date): Promise<Transaction[]> {
        if (day) {
            return await this.transactionsRepository
                .createQueryBuilder("Transaction")
                .where(`Transaction.createdAt = :day`, {day})
                .andWhere(new Brackets((qb) => {
                    qb.where("Transaction.debitedAccount = :currentAccountId", { currentAccountId })
                }),).getMany()
        }
        return await this.transactionsRepository
            .createQueryBuilder("Transaction")
            .andWhere(`Transaction.debitedAccountId = :currentAccountId;`, { currentAccountId })
            .getMany()
    }

    async findAllUsersTransactions(currentAccountId: number, day: Date): Promise<Transaction[]> {
        if (day) {
            return await this.transactionsRepository
                .createQueryBuilder("Transaction")
                .where(`Transaction.createdAt = :day`, {day})
                .andWhere(new Brackets((qb) => {
                        qb.where("Transaction.debitedAccount = :currentAccountId", { currentAccountId })
                            .orWhere("Transaction.creditedAccount = :currentAccountId", {currentAccountId})
                    }),).getMany()
        }
        return await this.transactionsRepository
            .createQueryBuilder("Transaction")
            .andWhere(`Transaction.debitedAccountId = :currentAccountId OR Transaction.creditedAccountId =
             :currentAccountId;`, {currentAccountId})
            .getMany()
    }
}