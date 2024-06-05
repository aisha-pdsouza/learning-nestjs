import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: "John Smith",
            email: "john.smith@gmail.com",
            role: "ADMIN"
        },
        {
            id: 2,
            name: "Rachel Green",
            email: "rachel.green@gmail.com",
            role: "ENGINEER"
        },
        {
            id: 3,
            name: "Mark Smith",
            email: "mark.smith@gmail.com",
            role: "ADMIN"
        },
        {
            id: 4,
            name: "Clara Nots",
            email: "clara.nots@gmail.com",
            role: "INTERN"
        },
        {
            id: 5,
            name: "Hannah Montana",
            email: "hannah.montana@gmail.com",
            role: "ENGINEER"
        }
    ]

    constructor(
        @InjectModel(User.name) private userModel: mongoose.Model<User>) {}

    getAllUsers()
    {
        return this.userModel.find();
    }

    getUserById(id: string)
    {
        return this.userModel.findById(id);
    }
    createUser(createUserDto: CreateUserDto)
    {
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
