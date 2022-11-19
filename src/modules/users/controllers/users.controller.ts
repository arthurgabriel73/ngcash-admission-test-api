import {Body, Controller, Post} from "@nestjs/common";
import {CreateUserDto} from "../dtos/create-user.dto";
import {UsersService} from "../services/users.service";
import {ResponseMapper} from "../../../interceptors/dto-response-mapper";
import {UserDto} from "../dtos/user.dto";
import {ApiTags} from "@nestjs/swagger";

export const USERS_URL = "/users"

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ResponseMapper(UserDto)
    @Post('signup')
    async register(@Body() data: CreateUserDto) {
        return this.usersService.create(data)
    }
}