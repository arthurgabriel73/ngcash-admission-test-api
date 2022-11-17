import { AuthDriver } from "../drivers/auth.driver";

export class AuthDSL {
    protected driver: AuthDriver
    private user
    private userId
    protected response

    constructor() {
        this.driver = new AuthDriver()
        this.user = null
        this.userId = ""
        this.response = null
    }

    async createDriver() {
        await this.driver.createAuthClient()
    }

    resetDataCache() {
        this.userId = ""
        this.response = {}
    }

    async loginTestUser(email: string, password: string) {
        const loginData = {
            "username": email,
            "password": password
        }
        return await this.driver.authorizeUser(loginData)
    }

    async createWrongCredentialsToLogin(username: string) {
        const wrongLoginData = {
            "username": username,
            "password": "Password123!"
        }
        return await this.driver.authorizeUser(wrongLoginData)
    }

    async closeClient() {
        await this.driver.driverAuthCloseClient()
    }
}