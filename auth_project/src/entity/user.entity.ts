import { ApiProperty } from '@nestjs/swagger';
import { UserDocument } from '../schema/user.schema';

export class UserEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty({ required: false })
  age?: number;

  @ApiProperty({ required: false })
  datebirth?: string;

  constructor(partial: { datebirth: Date; id: string; age: number; username: string }) {
    Object.assign( partial);
  }

  static fromDocument(doc: UserDocument): UserEntity {
    return new UserEntity({
      id: doc._id.toString(),
      username: doc.username,
      age: doc.age,
      datebirth: doc.datebirth,
    });
  }
}
