import { Fragment } from 'react';

import UserListView from '../UserList';
import UserChatView from '../UserChat';

export default function ChatView() {
  return (
    <Fragment>
      <div className='flex h-[90%] pb-5 pl-5 pr-5 w-full   '>
        <div className='w-[30%] h-full   '>
          <UserListView />
        </div>
        <div className='w-[70%] shadown-2xl   '>
          <UserChatView />
        </div>
      </div>
    </Fragment>
  );
}
