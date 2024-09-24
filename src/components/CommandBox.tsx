'use client';

//shadcn imports

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { DialogBox } from './DialogBox';
import { IRooms } from '@/types/Interfaces/chat.interface';
import { UserListSkeleton } from './UserListSkeleton';

//next imports

export function CommandBox({
  users,
  loading,
}: {
  users: IRooms[];
  loading: boolean;
}) {
  return (
    <Command className='pt-7 pl-10 rounded-l-2xl rounded-r-none  '>
      <div className='flex flex-row align-items justify-between pr-4'>
        <h1 className='ml-3 mb-4 text-[24px] font-lg'>Chat App</h1>
        {/* here comes the shadcn modal */}
        <DialogBox />
      </div>
      <CommandInput placeholder='search...' />
      <CommandList className='custom-scrollbar max-h-full'>
        {loading == false && <CommandEmpty>No results found.</CommandEmpty>}
        <CommandGroup
          heading='Users'
          className='mt-5'
        >
          {loading ? (
            <UserListSkeleton />
          ) : (
            users.length > 0 &&
            users?.map(user => (
              <CommandItem className={`hover:cursor-pointer`}>
                <Avatar className='h-[40px] w-[40px]'>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span
                  onClick={() => console.log('helo world')}
                  className='ml-2 p-4 w-full h-ful'
                >
                  {user.name}
                </span>{' '}
                {/** max length for this span is 44 */}
              </CommandItem>
            ))
          )}
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
}
