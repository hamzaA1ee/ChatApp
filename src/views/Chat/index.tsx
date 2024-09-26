'use client';
import { Fragment } from 'react';

import UserListView from '../UserList';
import UserChatView from '../UserChat';

//next imports
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { deleteCookie } from 'cookies-next';

export default function ChatView() {
  const router = useRouter();
  return (
    <Fragment>
      <div className='w-screen h-[10%] flex items-center justify-end'>
        <Button
          className='mr-10'
          onClick={() => {
            deleteCookie('accessToken');
            deleteCookie('user');
            router.push('/auth/login');
          }}
        >
          Logout
        </Button>
      </div>{' '}
      <div className='flex h-[90%] pb-5 pl-5 pr-5 w-full   '>
        <div className='w-[30%]    '>
          <UserListView />
        </div>
        <div className='w-[70%]    '>
          <UserChatView />
        </div>
      </div>
    </Fragment>
  );
}
