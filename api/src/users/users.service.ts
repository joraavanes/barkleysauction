import { BadRequestException, ExceptionFilter, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignInUserDto } from './dtos/signin-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async generateHash(str: string) {
        const salt = await genSalt(12);

        return await hash(str, salt);
    }

    generateToken(email: string, name: string) {
        return sign({ email, name }, 'SECRET_KEY');
    }

    verifyToken(token: string) {
        return verify(token, 'SECRET_KEY');
    }

    async signUp(createUserDto: CreateUserDto) {
        const existingUser = await this.findByEmail(createUserDto.email);

        if (existingUser) {
            throw new BadRequestException('Email is in use');
        }

        const password = await this.generateHash(createUserDto.password);

        const model = new this.userModel({
            ...createUserDto,
            password
        });
        return await model.save();
    }

    async signIn(signInUserDto: SignInUserDto): Promise<User> {
        const user = await this.findByEmail(signInUserDto.email);

        if (!user) throw new BadRequestException('Username or password is incorrect');

        const result = await compare(signInUserDto.password, user.password);

        if (!result) throw new BadRequestException('Username or password is incorrect');

        return user;
    }

    findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({
            email
        }).exec();
    }

    findById(id: string): Promise<User> {
        return this.userModel.findOne({
            _id: new ObjectId(id)
        }).exec();
    }

    getAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    update(id: string, attrs: Partial<User>) {
        // return this.userModel.findOneAndUpdate(
        //     {
        //         _id: new ObjectId(id),
        //     }, {
        //     $set: attrs
        // }, {
        //     new: true
        // }).exec();
        return this.userModel.updateOne(
            {
                _id: new Object(id)
            },
            attrs,
            {
                new: true
            }
        );
    }

    delete(id: string) {
        return this.userModel.deleteOne({
            _id: new ObjectId(id)
        });
    }
}
