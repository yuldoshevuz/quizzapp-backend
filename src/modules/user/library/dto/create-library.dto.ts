import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateLibraryDto {
    @IsString()
    @IsNotEmpty()
    cardId: string;
}