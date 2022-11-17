import {Between, Repository} from "typeorm";
import {BadRequestException, Inject, Injectable} from "@nestjs/common";
import {Transaction} from "../entities/transactions.entity";
import {GetAllTransactionsDto} from "../dtos/get-filtered-transactions.dto";
import {CashOutDto} from "../dtos/cash-out.dto";
import {AccountsService} from "../../accounts/services/accounts.service";

@Injectable()
export class TransactionsService {
    @Inject('TRANSACTIONS_REPOSITORY')
    private transactionsRepository: Repository<Transaction>

    constructor(private accountsService: AccountsService) {}

    async create(data: CashOutDto, currentAccountId: number, targetUsername: string): Promise<Transaction> {
        const targetAccount = await this.accountsService.findOneAccountByUsername(targetUsername)
        const currentAccount = await this.accountsService.findAccountById(currentAccountId)
        const newTransaction = new Transaction()

        newTransaction.debitedAccount = currentAccount
        newTransaction.creditedAccount = targetAccount
        newTransaction.value = data.value

        return await this.transactionsRepository.save(newTransaction)
    }

    async getFilteredTransactions(data: GetAllTransactionsDto, currentAccountId: number): Promise<Transaction[]> {
        let day: Date
        let start: Date
        let end: Date

        if (data.day) {
            day = new Date(Number(data.day)*1000)
        } else if (data.start) {
            start = new Date(Number(data.start)*1000)
        } else {
            start = new Date(1000)
        }

        if (data.end) {
            end = new Date(Number(data.end)*1000)
        } else {
            end = new Date(9000000000000)
        }

        if (data.type) {
            if (data.type !== "cash-in" && data.type !== "cash-out") {
                throw new BadRequestException('Invalid type of transactions. Please choose "cash-in" or ' +
                    '"cash-out" for parameters.')
            }
        }
        if (data.day) {
            return await this.transactionsRepository.find({ where: {
                createdAt: day
                }
            })
        }

        if (data.start && data.end) {
            return await this.transactionsRepository.find({ where: {
                    createdAt: Between(
                        start, end
                    ),
                }
            })
        }
        if (data.type === "cash-out") {
            return await this.transactionsRepository.find({ relations: {
                debitedAccount: true
                },
            where: {
                debitedAccount: {
                    id: currentAccountId
                }
            }
            })
        }

        if (data.type === "cash-in") {
            return await this.transactionsRepository.find({ relations: {
                creditedAccount: true
                },
            where: {
                creditedAccount: {
                    id: currentAccountId
                }
            }
            })
        }

        return await this.transactionsRepository.find({
            relations: {
                creditedAccount: true,
                debitedAccount: true,
            },
            where: {
                creditedAccount: {
                    id: currentAccountId
                },
                debitedAccount: {
                    id: currentAccountId
                }
            }
        })
    }
}