import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import * as mongoose from 'mongoose';
import { UsersSettings } from './schemas/users-settings.schema';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: mongoose.Model<User>,
        @InjectModel(UsersSettings.name) private userSettingsModel: mongoose.Model<UsersSettings>) {}

    getAllUsers()
    {
        return this.userModel.find().populate(['settings', 'posts']); //populate is used to populate actual values of the nested schema instead of its Id
    }

    getUserById(id: string)
    {
        return this.userModel.findById(id).populate(['settings', 'posts']); //populate is used to populate actual values of the nested schema instead of its Id
    }
    async createUser({settings, ...createUserDto }: CreateUserDto) //separating settings object from rest of the properties cause we need to create settings document separately before adding the ref to our UsersSchema
    {
        if(settings)
        {
            const newUserSettings = new this.userSettingsModel(settings);
            const newSettings = await newUserSettings.save();

            const newUser = new this.userModel(
                {
                    ...createUserDto,
                    settings: newSettings._id
                }
            );

            return newUser.save();
        }
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }

    updateUser(id: string, updatedUserDto: UpdateUserDto)
    {
        return this.userModel.findByIdAndUpdate(id, updatedUserDto, {new: true});
    }

    delete(id: string)
    {
        return this.userModel.findByIdAndDelete(id);
    }
}
