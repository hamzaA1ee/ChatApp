//components imports
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { clientSocket } from '@/socket';
import { IUser } from '@/types/Interfaces/user.interface';

//utils imports
import { getCookieFn } from '@/utils/storage.util';

//axios imports
import axios from 'axios';

//react imports
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosPersonAdd } from 'react-icons/io';

export function DialogBox() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState('');
  const [users, setUsers] = useState<IUser[]>();

  const userStringObj = getCookieFn('user');
  const userObj = userStringObj && JSON.parse(userStringObj);
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/search/${search}`,
          {
            headers: {
              Authorization: `Bearer ${getCookieFn('accessToken')}`,
            },
          },
        );
        if (result.status != 200 || result.data.length == 0)
          setResult('no users found');

        setUsers(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [search]);

  const handleAddFriend = (id: string, name: string) => {
    clientSocket.emit(
      'CREATE_ROOM',
      {
        type: 'direct',
        participants: [id],
        name: `${name} chats ${userObj.firstName}`,
      },
      (res: any) => {
        toast('New friend added');
      },
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          // className='bg-[#0F172A] text-[#F8FAFC]'
        >
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4 '>
          <div className='grid grid-cols-4  items-center justify-center gap-4'>
            <Input
              id='name'
              className='col-span-4 border-2 w-full'
              placeholder='search by room id'
              onChange={e => setSearch(e.currentTarget.value)}
              autoComplete='off'
            />
          </div>
          <div className='bg-green rounded-md shadow-md w-full h-full'>
            {users?.length !== 0 ? (
              users
                ?.filter(user => user.id !== userObj.id) // Filter out the current user
                .map(user => (
                  <div
                    key={user.id}
                    className='w-full h-[40px] text-black flex items-center justify-between'
                  >
                    <span className='ml-3'>
                      {user.firstName + ' ' + user.lastName}
                    </span>
                    <IoIosPersonAdd
                      onClick={() => handleAddFriend(user.id, user.firstName)}
                      className='w-[24px] h-[24px] mr-2 hover:cursor-pointer'
                    />
                  </div>
                ))
            ) : (
              <div className='w-full h-[40px] text-black flex items-center justify-start'>
                <span className='ml-3'>{result}</span>
              </div>
            )}
          </div>
        </div>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
