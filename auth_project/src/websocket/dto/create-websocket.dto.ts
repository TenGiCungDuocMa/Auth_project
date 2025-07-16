import { ApiProperty } from '@nestjs/swagger';

export class CreateWebsocketDto {
  @ApiProperty()
  data:string;
}
