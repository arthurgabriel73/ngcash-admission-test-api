import {Repository} from "typeorm";
import {Inject, Injectable} from "@nestjs/common";
import {Transaction} from "../entities/transactions.entity";

@Injectable()
export class TransactionsService {
    @Inject('TRANSACTIONS_REPOSITORY')
    private transactionsRepository: Repository<Transaction>

    async create(data: object) {
    }
}