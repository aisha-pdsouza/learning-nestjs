import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import  * as mongoose  from 'mongoose';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService)
    {}

    @Get() // /users or /users?role=ADMIN
    getAllUsers()
    {
        return this.userService.getAllUsers();
    }

    @Get(':id') // /users/1
    async getUserById(@Param('id') id: string)
    {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new HttpException('User not found!', 404);
        const findUser = await this.userService.getUserById(id);
        if(!findUser)
            return new HttpException("User not found!", 404);
        return findUser;
    }

    @Post('create') // /users/create
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto)
    {
        return this.userService.createUser(createUserDto);
    }

    @Patch(':id') // /users/8
    async updateUser(@Body(ValidationPipe) updateUserDto: UpdateUserDto, @Param('id') id: string)
    {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new HttpException('Invalid Id', 400);
        const updatedUser = await this.userService.updateUser(id, updateUserDto);
        if(!updatedUser)
            throw new HttpException("User not found!", 404);
        return updatedUser;
    }

    @Delete(':id')  // /users/9
    async deleteUser(@Param('id') id: string)
    {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new HttpException('Invalid Id', 400);
        const deletedUser = await this.userService.delete(id);
        if(!deletedUser)
            throw new HttpException("User not found!", 404);
        return deletedUser;
    }
}
