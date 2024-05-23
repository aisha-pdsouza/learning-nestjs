import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

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

    getAllUsers(role?: 'ADMIN' | 'ENGINEER' | 'INTERN')
    {
        if(role)
        {
            return this.users.filter(user=>user.role === role)
        }
        return this.users;
    }

    getUser(id: number)
    {
        return this.users.find(user=>user.id === id)
    }

    createUser(createUserDto: CreateUserDto)
    {
        const userByHighestId = [...this.users].sort((a,b)=>b.id-a.id);
        const newUser = {
            id: userByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id: number, updatedUserDto: UpdateUserDto)
    {
        this.users = this.users.map((user)=>
        {
            if(user.id === id)
            {
                return { ...user, ...updatedUserDto } //overrider users values with updatedUser
            }
            return user
        });
        return this.getUser(id);
    }

    delete(id: number)
    {
        const userToRemove = this.getUser(id);
        this.users = this.users.filter(user=>user.id !== id);
        return userToRemove;
    }
}
