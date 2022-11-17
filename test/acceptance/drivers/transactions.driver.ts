import * as request from 'supertest'
import { clientFactory } from "./client"
import { INestApplication } from "@nestjs/common/interfaces/nest-application.interface";
import {TRANSACTIONS_URL} from "../../../src/modules/transactions/controllers/transactions.controller";
import {CashOutDto} from "../../../src/modules/transactions/dtos/cash-out.dto";

export class TransactionsDriver {
    private test_client: INestApplication
    private response
    private token
    private url = TRANSACTIONS_URL

    constructor() {
        this.test_client = null
        this.response = {}
        this.token = ""
    }

    async createTransactionsClient() {
        this.test_client = await clientFactory()
    }

    async doCashOut(token: string, targetUsername: string, cashOutDto: CashOutDto) {
        await this.createTransactionsClient()
        return await request(this.test_client.getHttpServer())
            .post(this.url + "/cashout" + `/${targetUsername}`)
            .set('Authorization', 'Bearer ' + token)
            .send(cashOutDto as CashOutDto)
            .then(({body}) => {
                return body
            })
    };

    async driverCloseClient() {
        await this.test_client.close()
    }
}