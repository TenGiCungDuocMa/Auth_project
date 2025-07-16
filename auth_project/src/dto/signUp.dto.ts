import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'wintranit' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'strongpassword123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'strongpassword123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  repassword: string;
}
