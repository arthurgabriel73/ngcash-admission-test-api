import {Request, Body, Controller, Post, UseGuards, Param, Get, Query} from "@nestjs/common";
import {JwtAuthGuard} from "../../auth/security/jwt-auth.guard";
import {CashOutDto} from "../dtos/cash-out.dto";
import {TransactionsService} from "../services/transactions.service";
import {Transaction} from "../entities/transactions.entity";
import {GetFilteredTransactionsDto} from "../dtos/get-filtered-transactions.dto";
import {ApiBearerAuth, ApiQuery, ApiTags} from "@nestjs/swagger";
import {TransactionsEnum} from "../../../enums/transactions-enum";

export const TRANSACTIONS_URL = "/transactions"

@ApiBearerAuth()
@ApiTags('Transactions')
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
    constructor(private transactionsService: TransactionsService) {}

    @Post('cashout/:username')
    async cashOut(
        @Request() req, @Body() data: CashOutDto, @Param('username') username: string): Promise<Transaction>{
        return await this.transactionsService.create(data, req.user.id, username)
    }

    @ApiQuery({
        name: 'type',
        enum: TransactionsEnum,
        description: "Please choose an enum type.",})
    @ApiQuery({ name: 'day',
        type: "number",
        required: false,
        description: 'Please insert a unix time in milliseconds.',
        example: "1668915368432"})
    @Get('/self')
    async getSelfTransactions(@Request() req, @Query() query): Promise<Transaction[]> {
        const data: GetFilteredTransactionsDto = {
            day: query.day,
            type: query.type,
        }
        return await this.transactionsService.getFilteredTransactions(data, req.user.accountId)
    }
}