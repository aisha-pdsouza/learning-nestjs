import { Injectable } from "@nestjs/common";

@Injectable()
export class QuizService {

    getAllQuiz()
    {
         return [1,2,3,4,5,6,7];
    }
}