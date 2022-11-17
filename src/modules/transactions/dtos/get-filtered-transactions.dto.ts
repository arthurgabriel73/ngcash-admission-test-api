import { ApiProperty } from '@nestjs/swagger';
import {Timestamp} from "typeorm";

export class GetAllTransactionsDto {
    @ApiProperty({ nullable: true })
    day: Timestamp

    @ApiProperty({ nullable: true })
    start: Timestamp

    @ApiProperty({ nullable: true })
    end: Timestamp

    @ApiProperty({ nullable: true })
    type: string

}