import { Body, Controller, Delete, Get, HostParam, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDTo } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService
    ) { }

    @Post('/')
    async signUp(@Body() body: CreateUserDTo) {
        const user = await this.userService.signUp(body);
        return user;
    }
    
    @Get('/:id')
    getUsers(@Param('id') id: string) {
        return this.userService.findById(id);
    }

    @Get('/')
    getUser(@Query('email') email: string) {
        if(email)
            return this.userService.findByEmail(email);

        return this.userService.getAll();
    }

    @Patch('/:id')
    udpateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(id, body);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}
