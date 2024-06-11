import { BadRequestException, Body, Controller, Delete, Get, HttpException, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, UseFilters, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import  * as mongoose  from 'mongoose';
import { IdException } from 'src/exceptions/id-exception';
import { IdExceptionFilter } from 'src/exceptions/id-exception.filter';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';

@Controller('users')
@UseFilters(HttpExceptionFilter)
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
            return new NotFoundException("User not found!");
        return findUser;
    }

    @Get('/integer/:id') // /users/1
    @UseFilters(IdExceptionFilter)
    async getUserException(@Param('id', ParseIntPipe) id: number)
    {
        if(id <= 0)
        {
            throw new BadRequestException('Invalid Id');
        }
        return { success: true, id };
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
            throw new NotFoundException("User not found!");
        return updatedUser;
    }

    @Delete(':id')  // /users/9
    async deleteUser(@Param('id') id: string)
    {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new HttpException('Invalid Id', 400);
        const deletedUser = await this.userService.delete(id);
        if(!deletedUser)
            throw new NotFoundException("User not found!");
        return deletedUser;
    }
}
