//data-source imports
import { getDataSource } from '@/data-source';
//user Entity imports
import { UserEntity } from '@/entity/User.entity';
//interface imports
import { IUserRegisterUpdateType } from '@/types/Interfaces/user.interface';
/// Next Imports
import { NextRequest, NextResponse } from 'next/server';
//TypeORM imports
import { DataSource, Repository } from 'typeorm';

//bcrypt imports
import bcrypt from 'bcrypt';

export async function PUT(req: NextRequest) {
  try {
    const body: any = await req.json();
    if (!IUserRegisterUpdateType(body))
      return NextResponse.json({ error: 'invalid body type' }, { status: 400 });
    const AppDataSource: DataSource = await getDataSource();
    const userRepo: Repository<UserEntity> =
      await AppDataSource.getRepository(UserEntity);

    const user: UserEntity | null = await userRepo.findOne({
      where: {
        email: body.email,
      },
    });

    if (!user)
      return NextResponse.json({ error: 'user not found' }, { status: 404 });

    const hashedPassword: string = await bcrypt.hash(body.password, 10);
    user.password = hashedPassword;
    user.code = undefined;
    user.time = undefined;

    const res = await userRepo.save(user);
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
