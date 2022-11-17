import { ResponseDTO } from "src/interceptors/dto-response-mapper"

import {ApiProperty} from "@nestjs/swagger";
import {User} from "../entities/users.entity";

export class UserDto implements ResponseDTO {
    @ApiProperty()
    username: string

    @ApiProperty()
    accountId: number

    mapToResponse(user: User): { user: UserDto } {
        this.username = user.username
        return { user: this }
    }
}