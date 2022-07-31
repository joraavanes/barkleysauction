import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: User.name,
      // schema: UserSchema,
      useFactory: () => {
        const schema = UserSchema;
        schema.pre('save', function () {
          console.log('Hello from pre save');
        });
        schema.post('save', function () {
          console.log('Hello from post save');
        });
        schema.post('updateOne', function () {
          console.log('Some user is updated');
        });
        schema.post('deleteOne', function () {
          console.log('Some user data deleted');
        })
        return schema;
      }
    }])
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule { }
