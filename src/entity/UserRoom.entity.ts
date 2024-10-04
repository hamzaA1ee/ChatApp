import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './User.entity';
import { RoomEntity } from './Room.entity';

@Entity()
export class UserRoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;
}
