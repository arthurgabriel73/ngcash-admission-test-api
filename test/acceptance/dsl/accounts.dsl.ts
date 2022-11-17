import { AuthDriver } from "../drivers/auth.driver";
import {AccountsDriver} from "../drivers/accounts.driver";

export class AccountsDSL {
    protected driver: AccountsDriver
    private user
    private userId
    protected response

    constructor() {
        this.driver = new AccountsDriver()
        this.user = null
        this.userId = ""
        this.response = null
    }

    async createDriver() {
        await this.driver.createAccountsClient()
    }

    resetDataCache() {
        this.userId = ""
        this.response = {}
    }

    async getBalance(token: string) {
        return await this.driver.getBalance(token)
    }

    async closeClient() {
        await this.driver.driverCloseClient()
    }
}