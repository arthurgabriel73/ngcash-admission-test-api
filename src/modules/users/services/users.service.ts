import {User} from "../entities/users.entity";
import {Repository} from "typeorm";
import {ConflictException, Inject, Injectable, NotFoundException} from "@nestjs/common";
import {CreateUserDto} from "../dtos/create-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>

    async create(data: CreateUserDto): Promise<User> {
        const username = data.username
        const user = await this.usersRepository.findOne({ where: { username}})

        if (user) {
            throw new ConflictException(`The username ${data.username} is already in use.`)
        }

        data.password = bcrypt.hashSync(data.password, 10)

        const newUser = await this.usersRepository.create({
            ...data
        })
        return await this.usersRepository.save(newUser)
    }

    async findOne(username: string): Promise<User | undefined> {
        let user: User = await this.usersRepository.findOne({ where: { username } });

        if(!user) {
            throw new NotFoundException(`User from username ${username} not found.`)
        }
        return user
    }
}