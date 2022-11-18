import {User} from "../entities/users.entity";
import {Repository} from "typeorm";
import {ConflictException, forwardRef, Inject, Injectable, NotFoundException} from "@nestjs/common";
import {CreateUserDto} from "../dtos/create-user.dto";
import * as bcrypt from 'bcrypt';
import {AccountsService} from "../../accounts/services/accounts.service";

@Injectable()
export class UsersService {
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>

    constructor(
        @Inject(forwardRef(() => AccountsService))
        private accountsService: AccountsService
    ) {}

    async create(data: CreateUserDto): Promise<User> {
        const username = data.username
        const user = await this.usersRepository.findOne({ where: { username}})

        if (user) {throw new ConflictException(`The username ${data.username} is already in use.`)}

        data.password = bcrypt.hashSync(data.password, 10)

        const newUser = await this.usersRepository.create({
            ...data
        })
        const isUserCreated = await this.usersRepository.save(newUser)

        if (isUserCreated.id) {
            newUser.account = await this.accountsService.createNewAccount()
            await this.usersRepository.save(newUser)
        }
        return isUserCreated
    }

    async findOne(username: string): Promise<User | undefined> {
        let user: User = await this.usersRepository.findOne({ where: { username },
        relations: {
            account: true
        }});

        if(!user) {
            throw new NotFoundException(`User from username ${username} not found.`)
        }
        return user
    }
}