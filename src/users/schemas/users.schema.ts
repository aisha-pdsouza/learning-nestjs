
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class User {

    @Prop({ required: true, unique: true})
    userName: string;

    @Prop({ required: false })
    displayName?: string;

    @Prop({ required: false })
    avatarUrl?: string;

}

export const UserSchema = SchemaFactory.createForClass(User);