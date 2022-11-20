import {
    IsNotEmpty,
    IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({
        description: "User username to login",
        example: "jeffbeck123"
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: "User password",
        example: "Password123$"
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}