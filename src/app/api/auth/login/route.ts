import bcrypt from 'bcrypt';

import { getDataSource } from '@/data-source';
//interface imports
import { isUserLoginType } from '@/types/Interfaces/user.interface';
//next imports
import { NextRequest, NextResponse } from 'next/server';
//type orm imports
import { DataSource, Repository } from 'typeorm';

//entity import
import { UserEntity } from '@/entity/User.entity';

//jwt imports
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const body: any = await req.json();
    if (!isUserLoginType(body))
      return NextResponse.json({ error: 'invalid body type' }, { status: 400 });

    const AppDataSource: DataSource = await getDataSource();
    const userRepo: Repository<UserEntity> =
      await AppDataSource.getRepository(UserEntity);

    const user: UserEntity | null = await userRepo.findOneBy({
      email: body.email,
    });

    if (!user)
      return NextResponse.json({ error: 'no user found' }, { status: 404 });

    const comparedHash: boolean = await bcrypt.compare(
      body.password,
      user.password,
    );
    if (!comparedHash)
      return NextResponse.json(
        { error: 'invalid credentials' },
        { status: 401 },
      );

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      `${'HAMZA ALI'}`,
    );

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
