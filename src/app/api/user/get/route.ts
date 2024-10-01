import { getDataSource } from '@/data-source';
import { UserEntity } from '@/entity/User.entity';
import { NextRequest, NextResponse } from 'next/server';
import { DataSource, Repository } from 'typeorm';

export async function POST(req: NextRequest) {
  try {
    const body: any = await req.json();
    
    if (!Object.keys(body).includes('email'))
      return NextResponse.json({ error: 'invalid body type' }, { status: 400 });

    const AppDataSource: DataSource = await getDataSource();
    const userRepo: Repository<UserEntity> =
      await AppDataSource.getRepository(UserEntity);
    const user: UserEntity | null = await userRepo.findOneBy({
      email: body.email,
    });

    if (!user)
      return NextResponse.json({ error: 'no user found' }, { status: 404 });
    return NextResponse.json({ msg: 'user found' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
