import {
    IsNotEmpty,
    IsString, Matches, MinLength,
} from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,60}$/)
    password: string;
}
