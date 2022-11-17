import { UsersDriver } from "../drivers/users.driver"
import { AuthDSL } from "./auth.dsl";

export class UsersDSL {
    protected driver: UsersDriver
    private user
    private userId
    protected response
    private authDsl: AuthDSL
    private token

    constructor() {
        this.driver = new UsersDriver()
        this.authDsl = new AuthDSL()
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

    async createUser() {
        this.response = await this.driver.createTestUser(this.user)
        this.userId = this.response.id
    }

    // Asserts =========================================================================================================

    async assertResponseIsNewUser() {
        expect(this.response.user.username).toEqual(this.user.username)
        expect(this.response.user.id).toBeTruthy()
    }

    async closeClient() {
        await this.driver.driverCloseClient()
    }
}