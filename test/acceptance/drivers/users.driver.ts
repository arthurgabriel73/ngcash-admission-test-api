import * as request from 'supertest'
import { clientFactory } from "./client"
import { INestApplication } from "@nestjs/common/interfaces/nest-application.interface";
import { CreateUserDto } from "../../../src/modules/users/dtos/create-user.dto";
import {USERS_URL} from "../../../src/modules/users/controllers/users.controller";

export class UsersDriver {
    private test_client: INestApplication
    private response
    private token
    private url = USERS_URL

    constructor() {
        this.test_client = null
        this.response = {}
        this.token = ""
    }

    async createUsersClient() {
        this.test_client = await clientFactory()
    }

    async createTestUser(userJSON: CreateUserDto) {
        await this.createUsersClient()
        return await request(this.test_client.getHttpServer())
            .post(this.url + "/signup")
            .send(userJSON as CreateUserDto)
            .then(({body}) => {
                return body
            })
    };

    async driverCloseClient() {
        await this.test_client.close()
    }
}