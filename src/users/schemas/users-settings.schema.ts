import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UsersSettings{

    @Prop({ required: false })
    recieveNotifications?: boolean;

    @Prop({ required: false })
    recieveEmails?: boolean;

    @Prop({ required: false })
    recieveSMS?: boolean;
}


export const UserSettingsSchema = SchemaFactory.createForClass(UsersSettings);