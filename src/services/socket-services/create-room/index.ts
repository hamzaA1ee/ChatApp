import { getDataSource } from '@/data-source';
import { RoomEntity } from '@/entity/Room.entity';
import { UserEntity } from '@/entity/User.entity';
import { UserRoomEntity } from '@/entity/UserRoom.entity';
import { DataSource, Repository } from 'typeorm';

export const createRoom = async () => {
  try {
    const AppDataSource: DataSource = await getDataSource();
    const roomRepo: Repository<RoomEntity> =
      await AppDataSource.getRepository(RoomEntity);
    const userRepo: Repository<UserEntity> =
      await AppDataSource.getRepository(UserEntity);
    const userRoomRepo: Repository<UserRoomEntity> =
      await AppDataSource.getRepository(UserRoomEntity);

      
  } catch (error) {
    console.log(error);
    return error;
  }
};
