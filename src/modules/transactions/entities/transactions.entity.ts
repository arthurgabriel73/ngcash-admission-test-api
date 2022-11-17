import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn, OneToMany, JoinTable, CreateDateColumn,
} from "typeorm";
import {Account} from "../../accounts/entities/accounts.entity";


@Entity({ name: "Transaction" })
export class User {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @OneToMany(() => Account, (account) => account.id)
    @JoinTable({ name: "DebitedAccount" })
    debitedAccount: Account

    @OneToMany(() => Account, (account) => account.id)
    @JoinTable({ name: "CreditedAccount" })
    creditedAccount: Account

    @Column()
    value: number;

    @CreateDateColumn({type: "timestamp without time zone"})
    createdAt: Date
}