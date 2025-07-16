import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserSchema } from '../schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),JwtModule],
  providers: [UsersService],
  controllers:[UserController],
  exports: [UsersService],
})
export class UsersModule {}
