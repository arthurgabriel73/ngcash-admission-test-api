import {
    IsNotEmpty,
    IsString, MinLength, Validate
} from "class-validator";
import { PasswordValidation, PasswordValidationRequirement } from 'class-validator-password-check'

const passwordRequirement: PasswordValidationRequirement = {
    mustContainLowerLetter: true,
    mustContainNumber: true,
    mustContainSpecialCharacter: true,
    mustContainUpperLetter: true
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Validate(PasswordValidation, [passwordRequirement])
    password: string;
}
