import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false, min: 0 })
  age: number;

  @Prop({ required: false })
  datebirth: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
