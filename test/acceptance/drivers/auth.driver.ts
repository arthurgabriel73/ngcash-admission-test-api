import * as request from 'supertest'
import { clientFactory } from "./client"
import { INestApplication } from "@nestjs/common/interfaces/nest-application.interface";
import { AUTH_URL } from "../../../src/modules/auth/controllers/auth.controller";
import { LoginDto } from "../../../src/modules/auth/dtos/login.dto";

export class AuthDriver {
    private test_client: INestApplication
    private response
    private token
    private url = AUTH_URL

    constructor() {
        this.test_client = null
        this.response = {}
        this.token = ""
    }

    async createAuthClient() {
        this.test_client = await clientFactory()
    }

    async authorizeUser(loginJSON: LoginDto) {
        await this.createAuthClient()
        return await request(this.test_client.getHttpServer())
            .post(this.url + '/login')
            .send(loginJSON)
            .then(({body}) => {
                return body
            })
    }

    async driverAuthCloseClient() {
        await this.test_client.close()
    }
}