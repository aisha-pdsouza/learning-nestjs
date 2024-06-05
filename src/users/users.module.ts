import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schemas/users.schema';
import { UserSettingsSchema, UsersSettings } from './schemas/users-settings.schema';

@Module({
  imports: [MongooseModule.forFeature(
    [
      {name: User.name, schema: UserSchema },
      { name: UsersSettings.name, schema: UserSettingsSchema }
    ],
  )],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {

}
