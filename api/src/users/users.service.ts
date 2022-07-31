import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model, Query } from 'mongoose';
import { CreateUserDTo } from './dtos/create-user.dto';
import { SignInUserDto } from './dtos/signin-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async signUp(createUserDto: CreateUserDTo) {
        const model = new this.userModel(createUserDto);
        return await model.save();
    }

    signIn(signInUserDto: SignInUserDto) {

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
