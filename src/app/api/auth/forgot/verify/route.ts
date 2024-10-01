import { getDataSource } from '@/data-source';
import { UserEntity } from '@/entity/User.entity';
import { isForgotVerifyType } from '@/types/Interfaces/user.interface';
import { NextRequest, NextResponse } from 'next/server';
import { DataSource, Repository } from 'typeorm';

export async function POST(req: NextRequest) {
  try {
    const body: any = await req.json();
    if (!isForgotVerifyType(body))
      return NextResponse.json({ error: 'invalid body type' }, { status: 400 });

    const AppDataSource: DataSource = await getDataSource();
    const userRepo: Repository<UserEntity> =
      AppDataSource.getRepository(UserEntity);
    const user = await userRepo.findOneBy({
      email: body.email,
      code: body.code,
    });

    if (user?.time && new Date() > user.time)
      return NextResponse.json({ error: 'otp has expired' }, { status: 400 });

    return NextResponse.json({ msg: 'otp has been verified' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
