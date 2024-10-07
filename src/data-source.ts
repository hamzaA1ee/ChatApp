import { DataSource } from 'typeorm';
import { UserEntity } from './entity/User.entity';
import { ForgotEntity } from './entity/Forgot.entity';
import { UserRoomEntity } from './entity/UserRoom.entity';
import { FriendEntity } from './entity/Friend.entity';
import { RoomEntity } from './entity/Room.entity';
import { MessageEntity } from './entity/Message.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: `localhost`,
  port: 3306,
  username: `root`,
  password: `zenkoders`,
  database: `zenkoder`,
  synchronize: true,
  logging: true,
  entities: [
    UserEntity,
    ForgotEntity,
    UserRoomEntity,
    FriendEntity,
    RoomEntity,
    MessageEntity,
  ],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('db connected');
  })
  .catch(error => {
    console.log(error);
  });

export const getDataSource = (delay = 3000): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (AppDataSource.isInitialized) resolve(AppDataSource);
      else reject('Failed to create connection with database');
    }, delay);
  });
};
