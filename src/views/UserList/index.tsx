'use client';
import { Fragment, useEffect } from 'react';

//components imports
import { CommandBox } from '@/components/CommandBox';

import { getCookieFn } from '@/utils/storage.util';
import axios from 'axios';

export default function UserListView() {
  useEffect(() => {
    (async () => {
      const users = axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/rooms`, {
        headers: {
          Authorization: `Bearer ${getCookieFn('accessToken')}`,
        },
      });
    })();
  }, []);
  return (
    <Fragment>
      <CommandBox />
    </Fragment>
  );
}
