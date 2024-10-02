import bcrypt from 'bcrypt';

//type orm imports
import { getDataSource } from '@/data-source';
//next imports
import { NextRequest, NextResponse } from 'next/server';

//entity imports
import { UserEntity } from '@/entity/User.entity';

//interface imports
import { isUserRegisterType } from '@/types/Interfaces/user.interface';
import { DataSource, Repository } from 'typeorm';

export async function POST(req: NextRequest) {
  try {
    const body: any = await req.json();
    if (!isUserRegisterType(body))
      return NextResponse.json({ msg: 'Invalid body type' }, { status: 400 });

    const AppDataSource: DataSource = await getDataSource();
    const userRepo: Repository<UserEntity> =
      AppDataSource.getRepository(UserEntity);

    const exists: UserEntity[] = await userRepo.find({
      where: {
        email: body.email,
      },
    });
    if (exists.length > 0)
      return NextResponse.json({ msg: 'user already exists' }, { status: 409 });

    const hashedPassword: string = await bcrypt.hash(body.password, 10);
    const user = new UserEntity(
      body.firstName,
      body.lastName,
      body.email,
      hashedPassword,
      true,
    );

    const res: UserEntity = await userRepo.save(user);
    if (!res)
      return NextResponse.json(
        { error: 'failed to insert user' },
        { status: 400 },
      );

    return NextResponse.json({ res }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
