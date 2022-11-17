import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";


@Entity({ name: "Account" })
export class Account {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    balance: number;
}