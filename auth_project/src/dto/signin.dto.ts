import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'wintranit' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'strongpassword123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
