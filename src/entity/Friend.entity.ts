import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FriendEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column()
  userId: string;

  @Column()
  friendId: string;

  constructor(userId: string, friendId: string) {
    this.userId = userId;
    this.friendId = friendId;
  }
}
