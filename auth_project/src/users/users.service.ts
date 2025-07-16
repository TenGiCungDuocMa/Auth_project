import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from '../schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,private readonly jwtService: JwtService) {}

  async create(username: string, password: string): Promise<UserDocument> {
    try {
      const user = new this.userModel({ username, password });
      return await user.save();
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Username already exists');
      }
      throw err;
    }
  }


  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }
  async findById(userId: string): Promise<UserDocument | null> {
    return this.userModel.findById(userId).exec();
  }

  async findOne(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }


  async extractToken(req: Request) {
    return (await this.jwtService.verifyAsync(await this.extractToken(req), { secret: process.env.JWT_SECRET }))['user'].username;
  }
}
