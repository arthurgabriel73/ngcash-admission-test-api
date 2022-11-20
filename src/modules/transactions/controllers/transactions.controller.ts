import {Request, Body, Controller, Post, UseGuards, Param, Get, Query} from "@nestjs/common";
import {JwtAuthGuard} from "../../auth/security/jwt-auth.guard";
import {CashOutDto} from "../dtos/cash-out.dto";
import {TransactionsService} from "../services/transactions.service";
import {Transaction} from "../entities/transactions.entity";
import {GetFilteredTransactionsDto} from "../dtos/get-filtered-transactions.dto";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

export const TRANSACTIONS_URL = "/transactions"

@ApiBearerAuth()
@ApiTags('Transactions')
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
    constructor(private transactionsService: TransactionsService) {}

    @Post('cashout/:username')
    async cashOut(@Request() req, @Body() data: CashOutDto, @Param('username') username: string): Promise<Transaction>{
        return await this.transactionsService.create(data, req.user.id, username)
    }

    @Get('/self')
    async getSelfTransactions(@Request() req, @Body() data: GetFilteredTransactionsDto): Promise<Transaction[]> {
        return await this.transactionsService.getFilteredTransactions(data, req.user.accountId)
    }
}