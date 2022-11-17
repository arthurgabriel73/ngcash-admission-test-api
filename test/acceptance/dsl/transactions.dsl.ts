import {TransactionsDriver} from "../drivers/transactions.driver";
import {CashOutDto} from "../../../src/modules/transactions/dtos/cash-out.dto";

export class TransactionsDSL {
    protected driver: TransactionsDriver
    private user
    private userId
    protected response

    constructor() {
        this.driver = new TransactionsDriver()
        this.user = null
        this.userId = ""
        this.response = null
    }

    async createDriver() {
        await this.driver.createTransactionsClient()
    }

    resetDataCache() {
        this.response = {}
    }

    async doCashOut(token: string, targetUsername: string) {
        const cashOutDto = new CashOutDto()
        cashOutDto.value = 3500
        return await this.driver.doCashOut(token, targetUsername, cashOutDto)
    }

    async closeClient() {
        await this.driver.driverCloseClient()
    }
}