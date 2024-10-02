import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column()
  createdTime: Date;

  constructor(createdTime: Date) {
    this.id = undefined;
    this.createdTime = createdTime;
  }
}
