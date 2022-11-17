import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '../../users/services/users.service'
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user) {
            if (bcrypt.compareSync(pass, user.password)) {
                const {password, ...result} = user;
                return result;
            } else if (!bcrypt.compareSync(pass, user.password)) {
                throw new UnauthorizedException('Username or password is incorrect.');
            }
        }
    }

    async login(user: any) {
        const payload = {username: user.username, id: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}