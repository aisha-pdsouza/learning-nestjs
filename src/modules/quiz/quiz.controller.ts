import { Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/quiz.dto';

@Controller('quiz')
export class QuizController {
    constructor(private quizService: QuizService)
    {}

    @Get()
    getQuizzes()
    {
       return  this.quizService.getAllQuiz();
    }

    @Post('/create')
    // @HttpCode(201)
    @UsePipes(ValidationPipe)
    createQuiz(@Body() requestBody: CreateQuizDto)
    {
        return { data: requestBody };
    }
}
