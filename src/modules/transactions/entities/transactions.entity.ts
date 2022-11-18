import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany, JoinTable, CreateDateColumn, JoinColumn, OneToOne,
} from "typeorm";
import {Account} from "../../accounts/entities/accounts.entity";


@Entity({ name: "Transaction" })
export class Transaction {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @OneToOne(() => Account, (account) => account.id)
    @JoinColumn({ name: "DebitedAccount" })
    debitedAccount: Account

    @OneToOne(() => Account, (account) => account.id)
    @JoinColumn({ name: "CreditedAccount" })
    creditedAccount: Account

    @Column()
    value: number;

    @CreateDateColumn({type: "timestamp without time zone"})
    createdAt: Date
}