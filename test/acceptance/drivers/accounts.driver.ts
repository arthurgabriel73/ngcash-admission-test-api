import * as request from 'supertest'
import { clientFactory } from "./client"
import { INestApplication } from "@nestjs/common/interfaces/nest-application.interface";
import {ACCOUNTS_URL} from "../../../src/modules/accounts/controllers/accounts.controller";

export class AccountsDriver {
    private test_client: INestApplication
    private response
    private token
    private url = ACCOUNTS_URL

    constructor() {
        this.test_client = null
        this.response = {}
        this.token = ""
    }

    async createAccountsClient() {
        this.test_client = await clientFactory()
    }

    async getBalance(token: string) {
        await this.createAccountsClient()
        return await request(this.test_client.getHttpServer())
            .get(this.url + "/balance")
            .set('Authorization', 'Bearer ' + token)
            .then(({body}) => {
                return body
            })
    };

    async driverCloseClient() {
        await this.test_client.close()
    }
}