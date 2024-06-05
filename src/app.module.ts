import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './modules/quiz/quiz.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [QuizModule, UsersModule, MongooseModule.forRoot('mongodb://localhost:27017/nestjs')], //last part -> db name
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
