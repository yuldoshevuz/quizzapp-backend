import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class AuthUserDto {
    @IsNumber()
    @IsNotEmpty()
    telegramId: number;

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @Matches(/^(\+998)((2|5)0|(3|5|7|8){2}|(9[013-57-9]))\d{7}$/, { message: 'Invalid phone format' })
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;
}