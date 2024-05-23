import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService)
    {}

    @Get() // /users or /users?role=ADMIN
    getAllUsers(@Query('role') role?: 'INTERN'| 'ENGINEER'| 'ADMIN')
    {
        return this.userService.getAllUsers(role);
    }

    @Get(':id') // /users/1
    getUser(@Param('id', ParseIntPipe) id: number)
    {
        return  this.userService.getUser(id);
    }

    @Post('create') // /users/create
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto)
    {
        return this.userService.createUser(createUserDto);
    }

    @Patch(':id') // /users/8
    updateUser(@Body(ValidationPipe) updateUserDto: UpdateUserDto, @Param('id', ParseIntPipe) id: number)
    {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')  // /users/9
    deleteUser(@Param('id', ParseIntPipe) id: number)
    {
        return this.userService.delete(id);
    }
}
