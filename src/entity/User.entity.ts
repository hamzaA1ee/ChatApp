import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ForgotEntity } from './Forgot.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  verificationStatus: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  code: string | undefined;

  @Column({ type: 'timestamp', nullable: true })
  time: Date | undefined;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    verificationStatus: boolean,
  ) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.email = email;
    this.verificationStatus = verificationStatus ?? false;
    this.password = password;
  }
}
