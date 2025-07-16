import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller("/users")
export class UserController{

  constructor(private readonly userService: UsersService,) {}

  // @UseGuards(AuthGuard)
  // @ApiBearerAuth("access-token")
  // @ApiHeader({
  //   name: 'Authorization',
  //   description: 'Bearer token for authentication',
  //   required: true,
  //   example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  // })
  // @Get("extract-token")
  // extractToken(@Req() req: Request){
  //   return this.userService.extractToken(req)
  // }
}