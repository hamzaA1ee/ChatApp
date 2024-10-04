import { getDataSource } from '@/data-source';
import { FriendEntity } from '@/entity/Friend.entity';
import { UserEntity } from '@/entity/User.entity';
import { getTokenData } from '@/utils/helpers.util';
import { NextRequest, NextResponse } from 'next/server';
import { DataSource, Repository } from 'typeorm';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = params;
    const token = req.headers.get('Authorization')?.split(' ')[1];
    const tokenData = await getTokenData(token || '');
    if (!tokenData)
      return NextResponse.json({ error: 'invalid token' }, { status: 401 });

    const AppDataSource: DataSource = await getDataSource();
    const userRepo: Repository<UserEntity> =
      AppDataSource.getRepository(UserEntity);

    const user: UserEntity[] = await userRepo
      .createQueryBuilder('user')
      .where(
        'user.firstName like :firstName or user.lastName like :lastName or user.email like :email',
        { firstName: `%${slug}%`, lastName: `%${slug}%,`, email: `%${slug}%` },
      )
      .getMany();

    const friendRepo: Repository<FriendEntity> =
      AppDataSource.getRepository(FriendEntity);
    const friends: FriendEntity[] = await friendRepo
      .createQueryBuilder('friend_entity')
      .where(
        'friend_entity.userId=:userId or friend_entity.friendId=:friendId',
        { userId: tokenData.id, friendId: tokenData.id },
      )
      .getMany();
    let filteredFriends: UserEntity[] = [];
    for (let i = 0; i < friends.length; i++) {
      filteredFriends = user.filter(user => {
        if (user.id != friends[i].friendId && user.id != friends[i].userId)
          return user;
      });
    }

    if (filteredFriends.length == 0)
      return NextResponse.json({ error: 'user not found' }, { status: 404 });
    return NextResponse.json({ filteredFriends }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
