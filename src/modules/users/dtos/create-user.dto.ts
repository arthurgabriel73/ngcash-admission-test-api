import {
    IsNotEmpty,
    IsString, Matches, MinLength,
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        description: "User username",
        example: "jeffbeck123"
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @ApiProperty({
        description: "User password",
        example: "Password123$"
        }
    )
    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,60}$/, {message: 'Password must have: ' +
            'length from 8 to 60 and at least: One Symbol, One Number, One Uppercase Alphabetic Character, ' +
            'One Lowercase Alphabetic Character.'})
    password: string;
}
