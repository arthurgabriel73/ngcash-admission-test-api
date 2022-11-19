import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany, JoinTable, CreateDateColumn, JoinColumn, OneToOne, ManyToOne, PrimaryColumn,
} from "typeorm";
import {Account} from "../../accounts/entities/accounts.entity";


@Entity({ name: "Transaction" })
export class Transaction {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @PrimaryColumn({ type: "int", name: "debitedAccountId" })
    @ManyToOne(() => Account, (account) => account.id, {
        onDelete: "CASCADE"
    })
    debitedAccount: Account

    @PrimaryColumn({ type: "int", name: "creditedAccountId" })
    @ManyToOne(() => Account, (account) => account.id, {
        onDelete: "CASCADE"
    })
    creditedAccount: Account

    @Column()
    value: number;

    @CreateDateColumn({type: "date"})
    createdAt: Date
}