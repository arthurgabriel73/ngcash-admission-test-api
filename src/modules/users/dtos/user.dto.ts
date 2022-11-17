import { ResponseDTO } from "src/interceptors/dto-response-mapper"

import {ApiProperty} from "@nestjs/swagger";
import {User} from "../entities/users.entity";

export class UserDto implements ResponseDTO {
    @ApiProperty()
    id: number

    @ApiProperty()
    username: string

    @ApiProperty()
    accountId: number

    mapToResponse(user: User): { user: UserDto } {
        this.username = user.username
        this.id = user.id
        this.accountId = user.account.id
        return { user: this }
    }
}