import {
    Request,
    Controller,
    Post,
    UseGuards,
    Body } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import {AuthService} from "../services/auth.service";
import {LocalAuthGuard} from "../security/local-auth.guard";
import {ApiTags} from "@nestjs/swagger";

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
}