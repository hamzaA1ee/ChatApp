import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column()
  name: string;
  @Column()
  createdBy: string;

  @Column()
  participant: string;

  @Column()
  createdTime: Date;

  constructor(name: string, createdBy: string, participant: string) {
    this.createdTime = new Date();
    this.createdBy = createdBy;
    this.participant = participant;
    this.name = name;
  }
}
