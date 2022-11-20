import { ApiProperty } from '@nestjs/swagger';
import {Timestamp} from "typeorm";
import {IsOptional} from "class-validator";

export class GetFilteredTransactionsDto {
    @ApiProperty()
    @IsOptional()
    day: Timestamp

    @ApiProperty()
    @IsOptional()
    type: string

}