import { ResponseDTO } from "src/interceptors/dto-response-mapper"
import {User} from "../entities/users.entity";

export class UserDto implements ResponseDTO {
    username: string

    accountId: number

    mapToResponse(user: User): { user: UserDto } {
        this.username = user.username
        this.accountId = user.account.id
        return { user: this }
    }
}