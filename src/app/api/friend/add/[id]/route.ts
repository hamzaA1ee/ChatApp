import { getDataSource } from '@/data-source';
import { FriendEntity } from '@/entity/Friend.entity';
import { getTokenData } from '@/utils/helpers.util';
import { error } from 'console';
import { NextRequest, NextResponse } from 'next/server';
import { DataSource, Repository } from 'typeorm';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const header = req.headers.get('Authorization');
    const token = header?.split(' ')[1];
    if (!token)
      return NextResponse.json({ error: 'no token found' }, { status: 401 });
    const user = await getTokenData(token);

    const AppDataSource: DataSource = await getDataSource();
    const friendRepo: Repository<FriendEntity> =
      await AppDataSource.getRepository(FriendEntity);
      if(!user) return NextResponse.json({error:'invalid token'},{status:401})

    const createdFriend = new FriendEntity(user?.id, id);
    const res: FriendEntity = await friendRepo.save(createdFriend);

    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
