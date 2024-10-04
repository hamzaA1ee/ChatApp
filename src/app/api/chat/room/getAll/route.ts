import { getDataSource } from '@/data-source';
import { RoomEntity } from '@/entity/Room.entity';
import { getTokenData } from '@/utils/helpers.util';
import { error } from 'console';
import { NextRequest, NextResponse } from 'next/server';
import { DataSource, Repository } from 'typeorm';

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    const tokenData = await getTokenData(token || '');
    if (!tokenData)
      return NextResponse.json(
        { error: 'invalid token data' },
        { status: 401 },
      );
    const AppDataSource: DataSource = await getDataSource();
    const roomRepo: Repository<RoomEntity> =
      AppDataSource.getRepository(RoomEntity);
    const res = await roomRepo
      .createQueryBuilder('room_entity')
      .where('room_entity.createdBy=:id or room_entity.participant=:id', {
        id: tokenData.id,
      })
      .getMany();

    if (!res)
      return NextResponse.json({ error: 'no rooms found' }, { status: 404 });
    return NextResponse.json({ rooms: res }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
