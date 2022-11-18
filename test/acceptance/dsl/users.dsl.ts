import { UsersDriver } from "../drivers/users.driver"
import { AuthDSL } from "./auth.dsl";
import {AccountsDSL} from "./accounts.dsl";
import {TransactionsDSL} from "./transactions.dsl";
import {exploreApiConsumesMetadata} from "@nestjs/swagger/dist/explorers/api-consumes.explorer";

export class UsersDSL {
    protected driver: UsersDriver
    private user
    private userId
    protected response
    private authDsl: AuthDSL
    private accountsDsl: AccountsDSL
    private transactionsDsl: TransactionsDSL
    private token

    constructor() {
        this.driver = new UsersDriver()
        this.authDsl = new AuthDSL()
        this.accountsDsl = new AccountsDSL()
        this.transactionsDsl = new TransactionsDSL()
        this.user = null
        this.userId = ""
        this.response = null
        this.token = ""
    }

    getUser() {
        return this.user
    }


    async createDriver() {
        await this.driver.createUsersClient()
    }

    resetDataCache() {
        this.user = null
        this.userId = ""
        this.response = null
        this.token = ""
    }

    generateUser() {
        this.user = {
            "username": "jeffbeck123",
            "password": "Password!123",
        }
    }

    generateSecondUser() {
        this.user = {
            "username": "sting456",
            "password": "Password!123",
        }
    }

    async createUser() {
        this.response = await this.driver.createTestUser(this.user)
        this.userId = this.response.id
    }

    async loginAuthorization() {
        this.response = await this.authDsl.loginTestUser(this.user.username, this.user.password)
        this.token = this.response.access_token
    }

    async generateWrongCredentials() {
        this.response = await this.authDsl.createWrongCredentialsToLogin(this.user.username)
    }

    async getBalance() {
        this.response = await this.accountsDsl.getBalance(this.token)
    }

    async doCashOut() {
        this.generateUser()
        this.response = await this.transactionsDsl.doCashOut(this.token, this.user.username )
    }

    async getSelfTransactions() {
        this.response = await this.transactionsDsl.getSelfTransactions(this.token)
    }
    // Asserts =========================================================================================================

    async assertResponseIsNewUser() {
        expect(this.response.user.username).toEqual(this.user.username)
        expect(this.response.user.id).toBeTruthy()
    }

    async assertResponseIsConflictException() {
        expect(this.response.statusCode).toEqual(409)
    }

    async assertResponseIsUnauthorizedException() {
        expect(this.response.statusCode).toEqual(401)
    }

    async assertUserIsLogged() {
        expect(this.response).toHaveProperty("access_token")
    }

    async assertResponseIsBalance() {
        expect(this.response).toHaveProperty("account_balance")
    }

    async assertResponseIsNewCurrentTransaction() {
        expect(this.response).toHaveProperty("createdAt")
    }

    async assertResponseIsATransactionsArray() {
        expect(this.response[0].createdAt).toBeTruthy()
    }

    async closeClient() {
        await this.driver.driverCloseClient()
    }
}