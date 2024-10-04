import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column()
  roomId: string;

  @Column()
  createdBy: string;

  @Column()
  msg: string;

  constructor(roomId: string, createdBy: string, msg: string) {
    this.roomId = roomId;
    this.createdBy = createdBy;
    this.msg = msg;
  }
}
