import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ForgotEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column()
  code: string;

  @Column()
  time: Date;

  constructor(code: string, time: Date) {
    this.code = code;
    this.time = time;
  }
}
