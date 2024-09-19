import { Fragment } from 'react';

import UserListView from '../UserList';

export default function ChatView() {
  return (
    <Fragment>
      <div className='flex h-[90%] pb-5 pl-5 pr-5 w-full'>
        <div className='w-[30%] bg-green-500  '>
          <UserListView />
        </div>
        <div className='w-[70%] bg-blue-500  '></div>
      </div>
    </Fragment>
  );
}
