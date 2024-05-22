import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    
    @Get() // /users or /users?role=ADMIN
    getAllUsers(@Query('role') role?: 'INTERN'| 'ENGINEER'| 'ADMIN')
    {
        return  role;
    }

    @Get(':id') // /users/1
    getUser(@Param() id: string)
    {
        return  id;
    }

    @Post('create') // /users/create
    createUser(@Body() requesttBody: {})
    {
        return requesttBody;
    }

    @Patch(':id') // /users/8
    updateUser(@Body() requestBody: {}, @Param() id: string)
    {
        return {requestBody, id};
    }

    @Delete(':id')  // /users/9
    deleteUser(@Param() id: string)
    {
        return id;
    }
}
