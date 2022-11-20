import {Request, Controller, Get, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../auth/security/jwt-auth.guard";
import {AccountsService} from "../services/accounts.service";
import {Account} from "../entities/accounts.entity";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

export const ACCOUNTS_URL = "/accounts"

@ApiBearerAuth()
@ApiTags('Accounts')
@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService) {}

    @Get('balance')
    async getBalance(@Request() req): Promise<object> {
         return await this.accountsService.getBalance(req.user.accountId)
    }
}