import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './modules/quiz/quiz.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [QuizModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
