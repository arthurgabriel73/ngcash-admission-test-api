import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {CreateUserDto} from "../dtos/create-user.dto";

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('register')
    async register(@Body() data: CreateUserDto) {
        return this.usersService.create()
    }

}