import {
    IsNotEmpty, IsNumber,
} from "class-validator";

export class CashOutDto {
    @IsNumber()
    @IsNotEmpty()
    value: number;
}