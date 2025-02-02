'use client';
import { Fragment, useEffect, useState } from 'react';

//components imports
import { CommandBox } from '@/components/CommandBox';

import { getCookieFn } from '@/utils/storage.util';
import axios from 'axios';
import { IRooms } from '@/types/Interfaces/chat.interface';

export default function UserListView() {
  const [loading, setLoading] = useState(true);
  const [users, setUser] = useState<IRooms[]>([
    {
      createdBy: '',
      created_at: '',
      id: '',
      name: '',
      participant: '',
      type: '',
    },
  ]);
  useEffect(() => {
    try {
      setTimeout(async () => {
        const users = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/chat/room/getAll`,
          {
            headers: {
              Authorization: `Bearer ${getCookieFn('accessToken')}`,
            },
          },
        );
        if (users.status == 200) {
          setUser(users?.data.rooms);
          console.log(users.data);
          setLoading(false);
        }
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <Fragment>
      <CommandBox
        users={users}
        loading={loading}
      />
    </Fragment>
  );
}
