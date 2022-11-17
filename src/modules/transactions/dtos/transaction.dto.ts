import {
    IsDate,
    IsNotEmpty, IsNumber,
} from "class-validator";

export class TransactionDto {
    @IsNotEmpty()
    transactionId: number

    @IsNumber()
    @IsNotEmpty()
    debitedAccountId: number;

    @IsNumber()
    @IsNotEmpty()
    creditedAccountId: number;

    @IsNumber()
    @IsNotEmpty()
    value: number;

    @IsDate()
    createdAt: Date
}