
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UsersSettings } from './users-settings.schema';

@Schema()
export class User {

    @Prop({ required: true, unique: true})
    userName: string;

    @Prop({ required: false })
    displayName?: string;

    @Prop({ required: false })
    avatarUrl?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UsersSettings.name})
    settings?: UsersSettings;

}

export const UserSchema = SchemaFactory.createForClass(User);