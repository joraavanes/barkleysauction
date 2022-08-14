import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignInUserDto } from './dtos/signin-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService
    ) { }

    @Post('/signUp')
    async signUp(@Body() body: CreateUserDto) {
        const user = await this.userService.signUp(body);
        const token = this.userService.generateToken(user.email, user.name);
        return { token };
    }

    @Post('/signIn')
    async signIn(@Body() body: SignInUserDto) {
        const user = await this.userService.signIn(body);
        const token = this.userService.generateToken(user.email, user.name);
        return { token };
    }

    @Get('/:id')
    getUsers(@Param('id') id: string) {
        return this.userService.findById(id);
    }

    @Get('/')
    getUser(@Query('email') email: string) {
        if (email)
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
