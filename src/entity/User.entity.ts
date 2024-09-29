import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    verificationStatus: boolean,
  ) {
    this.id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.email = email;
    this.verificationStatus = verificationStatus ?? false;
    this.password = password;
  }
}
