import {Request, Body, Controller, Post, UseGuards, Param, Get, Query} from "@nestjs/common";
import {JwtAuthGuard} from "../../auth/security/jwt-auth.guard";
import {CashOutDto} from "../dtos/cash-out.dto";
import {TransactionsService} from "../services/transactions.service";
import {Transaction} from "../entities/transactions.entity";
import {GetAllTransactionsDto} from "../dtos/get-filtered-transactions.dto";

export const TRANSACTIONS_URL = "/accounts"

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
    constructor(private transactionsService: TransactionsService) {}

    @Post('cashout/:username')
    async cashOut(@Request() req, @Body() data: CashOutDto, @Param('username') username: string): Promise<Transaction>{
        return await this.transactionsService.create(data, req.user.id, username)
    }

    @Get('/self')
    async getSelfTransactions(@Request() req, @Query() query): Promise<Transaction[]> {
        const data: GetAllTransactionsDto = {
            day: query.day,
            start: query.start,
            end: query.end,
            type: query.type,
        }
        return await this.transactionsService.getFilteredTransactions(data, req.user.accountId)
    }
}