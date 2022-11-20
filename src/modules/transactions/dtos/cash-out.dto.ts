import {
    IsNotEmpty, IsNumber,
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CashOutDto {
    @ApiProperty({
        description: "Transaction value",
        example: 33
    })
    @IsNumber()
    @IsNotEmpty()
    value: number;
}