import { ApiProperty } from '@nestjs/swagger';
import {Timestamp} from "typeorm";
import {IsEnum, IsNumber, IsOptional} from "class-validator";
import {TransactionsEnum} from "../../../enums/transactions-enum";


export class GetFilteredTransactionsDto {
    @ApiProperty({
        type: () => "Timestamp",
        description: "Timestamp in milliseconds",
        example: 1668915368432,
    })
    @IsNumber()
    @IsOptional()
    day: Timestamp

    @ApiProperty({
        description: "TransactionsEnum type",
        example: "cash-in or cash-out",
    })
    @IsEnum(TransactionsEnum, {message: 'Please, choose a valid enum value: "cash-in" or "cash-out"'})
    @IsOptional()
    type: string

}