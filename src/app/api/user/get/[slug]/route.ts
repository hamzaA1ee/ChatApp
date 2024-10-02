import { getDataSource } from '@/data-source';
import { UserEntity } from '@/entity/User.entity';
import { NextRequest, NextResponse } from 'next/server';
import { DataSource, Repository } from 'typeorm';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = params;
    const AppDataSource: DataSource = await getDataSource();
    const userRepo: Repository<UserEntity> =
      await AppDataSource.getRepository(UserEntity);

    const user: UserEntity[] = await userRepo
      .createQueryBuilder('user')
      .where(
        'user.firstName like :firstName or user.lastName like :lastName or user.email like :email',
        { firstName: `%${slug}%`, lastName: `%${slug}%,`, email: `%${slug}%` },
      )
      .getMany();

    if (user.length == 0)
      return NextResponse.json({ error: 'user not found' }, { status: 404 });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    
    return NextResponse.json({ error }, { status: 500 });
  }
}
