import {
    Request,
    Controller,
    Post,
    UseGuards,
    Body, Param, Get
} from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import {AuthService} from "../services/auth.service";
import {LocalAuthGuard} from "../security/local-auth.guard";
import {ApiTags} from "@nestjs/swagger";
import {CashOutDto} from "../../transactions/dtos/cash-out.dto";
import {Transaction} from "../../transactions/entities/transactions.entity";
import {JwtAuthGuard} from "../security/jwt-auth.guard";

export const AUTH_URL = "/auth"

@ApiTags('Authentication')
@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Request() req, @Body() body: LoginDto) {
        return this.authService.login(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('validate')
    async validateToken(): Promise<boolean> {
        return true
    }
}