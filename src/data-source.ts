import { DataSource } from 'typeorm';
import { UserEntity } from './entity/User.entity';
import { ForgotEntity } from './entity/Forgot.entity';
import { UserRoomEntity } from './entity/UserRoom.entity';
import { FriendEntity } from './entity/Friend.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: `${process.env.NEXT_PUBLIC_TYPEORM_HOST}`,
  port: parseInt(`${process.env.NEXT_PUBLIC_TYPEORM_PORT}`),
  username: `${process.env.NEXT_PUBLIC_TYPEORM_USERNAME}`,
  password: `${process.env.NEXT_PUBLIC_TYPEORM_PASSWORD}`,
  database: `${process.env.NEXT_PUBLIC_TYPEORM_DATABASE}`,
  synchronize: true,
  logging: true,
  entities: [UserEntity, ForgotEntity, UserRoomEntity, FriendEntity],
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
