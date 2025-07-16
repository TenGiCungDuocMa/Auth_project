import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async generateAccessToken(userId: string, username: string): Promise<{ access_token: string }> {
    const payload = { sub: userId, username };
    return {
      access_token: await this.jwtService.signAsync(payload,{
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async signIn(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.generateAccessToken(user._id.toString(), user.username);
  }

  async signUp(username: string, password: string, repassword: string): Promise<{ access_token: string }> {
    if (password !== repassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const existingUser = await this.usersService.findOne(username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.create(username, hashed);

    return this.generateAccessToken(newUser._id.toString(), newUser.username);
  }
}
