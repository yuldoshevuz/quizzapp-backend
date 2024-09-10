import { IsNotEmpty, IsString } from "class-validator";

export class CreateCardItemDto {
    @IsString()
    @IsNotEmpty()
    term: string;

    @IsString()
    @IsNotEmpty()
    definition: string;
}