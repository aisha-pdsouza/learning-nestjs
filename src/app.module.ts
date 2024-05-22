import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './modules/quiz/quiz.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [QuizModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
