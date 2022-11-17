import {Repository} from "typeorm";
import {Inject, Injectable} from "@nestjs/common";

import {Account} from "../entities/accounts.entity";

@Injectable()
export class AccountsService {
    @Inject('ACCOUNTS_REPOSITORY')
    private accountsRepository: Repository<Account>

    async create(data: object) {
    }
}