import { IsNotEmpty, Length } from "class-validator";

export class CreateQuizDto {
    @IsNotEmpty({ message: 'The quiz title cant be empty!'})
    @Length(3, 255)
    title: string;

    @IsNotEmpty()
    @Length(3)
    description: string;
}