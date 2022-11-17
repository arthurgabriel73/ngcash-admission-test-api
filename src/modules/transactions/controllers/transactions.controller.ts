import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../auth/security/jwt-auth.guard";
import {CashOutDto} from "../dtos/cash-out.dto";
import {TransactionsService} from "../services/transactions.service";

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
    constructor(private transactionsService: TransactionsService) {}

    @Post('cashout')
    async cashOut(@Body() data: CashOutDto) {
        return this.transactionsService.create(data)
    }

}