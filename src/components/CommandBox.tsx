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

//next imports

export function CommandBox() {
  return (
    <Command className='pt-7 pl-10  h-full   rounded-l-2xl rounded-r-none  '>
      <h1 className='ml-3 mb-4 text-[24px] font-lg'>Chat App</h1>
      <CommandInput placeholder='search...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup
          heading='Users'
          className='mt-5'
        >
          <CommandItem className={`hover:cursor-pointer`}>
            <Avatar className='h-[40px] w-[40px]'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span
              onClick={() => console.log('helo world')}
              className='ml-2 p-4 w-full h-ful'
            >
              {'Hamza Ali'}
            </span>{' '}
            {/** max length for this span is 44 */}
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
}
