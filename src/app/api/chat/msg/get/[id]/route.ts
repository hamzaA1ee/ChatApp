import { getDataSource } from '@/data-source';
import { MessageEntity } from '@/entity/Message.entity';
import { RoomEntity } from '@/entity/Room.entity';
import { getTokenData } from '@/utils/helpers.util';
import { error } from 'console';
import { NextRequest, NextResponse } from 'next/server';
import { DataSource, Repository } from 'typeorm';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params; //roomId
    const token = req.headers.get('Authorization')?.split(' ')[1];
    const userData = await getTokenData(token || '');
    if (!userData)
      return NextResponse.json({ error: 'invalid token' }, { status: 401 });

    const AppDataSource: DataSource = await getDataSource();
    const msgRepo: Repository<MessageEntity> =
      AppDataSource.getRepository(MessageEntity);
    const msgs: MessageEntity[] = await msgRepo.find({
      where: {
        roomId: id,
      },
    });
    if (msgs.length == 0)
      return NextResponse.json({ error: 'no chats found' }, { status: 404 });

    return NextResponse.json({ msgs }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
