import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

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
    getUser(@Param('id') id: string)
    {
        return  this.userService.getUser(+id);
    }

    @Post('create') // /users/create
    createUser(@Body() user: { name: string; email: string; role: "INTERN" | "ENGINEER" | "ADMIN"; })
    {
        return this.userService.createUser(user);
    }

    @Patch(':id') // /users/8
    updateUser(@Body() user: { name?: string; email?: string; role?: "INTERN" | "ENGINEER" | "ADMIN"; }, @Param('id') id: string)
    {

        console.log(user)
        console.log(id)
        return this.userService.updateUser(+id, user);
    }

    @Delete(':id')  // /users/9
    deleteUser(@Param('id') id: string)
    {
        return this.userService.delete(+id);
    }
}
