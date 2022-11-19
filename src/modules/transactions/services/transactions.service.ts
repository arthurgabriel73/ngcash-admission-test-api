import {Between, Repository, SelectQueryBuilder} from "typeorm";
import {BadRequestException, Inject, Injectable, NotAcceptableException} from "@nestjs/common";
import {Transaction} from "../entities/transactions.entity";
import {GetAllTransactionsDto} from "../dtos/get-filtered-transactions.dto";
import {CashOutDto} from "../dtos/cash-out.dto";
import {AccountsService} from "../../accounts/services/accounts.service";
import {Account} from "../../accounts/entities/accounts.entity";

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
        let newTransaction = new Transaction()

        if (targetAccount.id === currentAccount.id) {
            throw new NotAcceptableException('Please, choose a valid target account.')
        }

        currentAccount.balance = currentAccount.balance - data.value
        targetAccount.balance = targetAccount.balance + data.value

        if (currentAccount.balance < 0) {
            throw new NotAcceptableException('Account out of founds.')
        }

        newTransaction.debitedAccount = currentAccount
        newTransaction.creditedAccount = targetAccount
        newTransaction.value = data.value


        await this.accountsRepository.save(currentAccount)
        await this.accountsRepository.save(targetAccount)

        return await this.transactionsRepository.save(newTransaction)
    }

    async getFilteredTransactions(data: GetAllTransactionsDto, currentAccountId: number): Promise<Transaction[]> {
        let day: Date = null

        if (data.day) {
            day = new Date(Number(data.day)*1000)
        }

        if (data.type) {
            if (data.type !== "cash-in" && data.type !== "cash-out") {
                throw new BadRequestException('Invalid type of transactions. Please choose "cash-in" or ' +
                    '"cash-out" for parameters.')
            }
        }

        if (data.type === "cash-in") {
            return await this.getCashInFilteredByDay(currentAccountId, day)
        }

        if (data.type === "cash-out") {
            return await this.getCashOutFilteredByDay(currentAccountId, day)
        }

        return await this.transactionsRepository
            .createQueryBuilder("Transaction")
            .andWhere(`Transaction.creditedAccount = :currentAccountId OR Transaction.debitedAccountId = :currentAccountId;`, {currentAccountId})
            .getMany()
    }

    async getCashInFilteredByDay(currentAccountId: number, day: Date): Promise<Transaction[]> {
        if (day) {
            return await this.transactionsRepository
                .createQueryBuilder("Transaction")
                .where(`Transaction.creditedAccountId = :currentAccountId;`, {currentAccountId})
                .where(`Transaction.createdAt = :day`, {day})
                .getMany()
        }
        return await this.transactionsRepository
            .createQueryBuilder("Transaction")
            .where(`Transaction.creditedAccountId = :currentAccountId;`, {currentAccountId})
            .getMany()
    }

    async getCashOutFilteredByDay(currentAccountId: number, day: Date): Promise<Transaction[]> {
        if(day) {
            return await this.transactionsRepository
                .createQueryBuilder("Transaction")
                .where(`Transaction.debitedAccountId = :currentAccountId;`, {currentAccountId})
                .where(`Transaction.createdAt = :day`, {day})
                .getMany()
        }
        return await this.transactionsRepository
            .createQueryBuilder("Transaction")
            .where(`Transaction.debitedAccountId = :currentAccountId;`, {currentAccountId})
            .getMany()
    }
}