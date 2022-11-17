import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from "typeorm";
import {Account} from "../../accounts/entities/accounts.entity";


@Entity({ name: "User" })
export class User {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({length: 50, unique: true})
    username: string;

    @Column()
    password: string;

    @OneToOne(() => Account, (account) => account.id, {onDelete: "CASCADE"})
    @JoinColumn()
    account: Account
}