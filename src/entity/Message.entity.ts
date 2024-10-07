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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdTime!: Date;

  constructor(roomId: string, createdBy: string, msg: string) {
    this.roomId = roomId;
    this.createdBy = createdBy;
    this.msg = msg;
  }
}
