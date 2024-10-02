import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './User.entity';

@Entity()
export class UserRoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, user => user.userRooms)
  user: UserEntity | undefined;

  constructor(userId: string) {
    this.userId = userId;
  }
}
