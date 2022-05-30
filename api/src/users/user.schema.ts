import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, trim: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: false })
    userConfirmed: boolean;

    @Prop()
    lastLogin: Date;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    surname: string;

    @Prop(raw({
        access: { type: String },
        token: { type: String }
    }))
    tokens: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);