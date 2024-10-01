import { getDataSource } from '@/data-source';
import { ForgotEntity } from '@/entity/Forgot.entity';
import { UserEntity } from '@/entity/User.entity';
import { isForgotType } from '@/types/Interfaces/user.interface';
import { generateOTP, mailSender } from '@/utils/mailSender.utils';
import { NextRequest, NextResponse } from 'next/server';
import { DataSource, Repository } from 'typeorm';

export async function POST(req: NextRequest) {
  try {
    const body: any = await req.json();
    if (!isForgotType(body))
      return NextResponse.json({ error: 'invalid body type' }, { status: 400 });

    const AppDataSource: DataSource = await getDataSource();
    const userRepe: Repository<UserEntity> =
      await AppDataSource.getRepository(UserEntity);

    const user: UserEntity | null = await userRepe.findOne({
      where: {
        email: body.email,
      },
    });
    if (!user)
      return NextResponse.json({ error: 'user not found' }, { status: 400 });
    const otp: string = generateOTP();
    const now = new Date();
    user.code = otp;
    user.time = new Date(now.getTime() + 3 * 60 * 1000);

    const res: UserEntity = await userRepe.save(user);

  

    const emailSent: boolean = await mailSender(
      body.email,
      'Forgot Password',
      `your otp is ${otp}`,
    );

    if (!emailSent)
      return NextResponse.json(
        { error: 'failed to send otp' },
        { status: 400 },
      );
    return NextResponse.json({ msg: 'otp sent' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
