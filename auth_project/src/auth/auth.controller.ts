import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus, Param,
  Post,
  Request, Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from '../metadata';
import { SignInDto } from '../dto/signin.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse, ApiTags,
} from '@nestjs/swagger';
import { SignUpDto } from '../dto/signUp.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @Get("test")
  test(@Res() res: Response){
    res.status(HttpStatus.OK).json([]);
  }

  @Public()
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto.username, signUpDto.password, signUpDto.repassword);
  }
}
