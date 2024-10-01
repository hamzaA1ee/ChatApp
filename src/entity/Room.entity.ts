import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column()
  participants: string[];

  @Column()
  createdTime: Date;

  constructor(participants: string[], createdTime: Date) {
    this.id = undefined;
    this.participants = participants;
    this.createdTime = createdTime;
  }
}
