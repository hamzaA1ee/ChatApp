import { Fragment } from 'react';

//componenets imports
import { AvatarDemo } from '@/components/Avatar';

//shadcn imports
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function UserChatView() {
  return (
    <Fragment>
      <div className='flex flex-col align-items justify-center w-full h-full rounded-tr-2xl shadown-inner bg-gray-300'>
        <div className=' h-[10%] rounded-tr-2xl flex items-center  justify-start'>
          <AvatarDemo
            className=' w-[44px] h-[44px] ml-4'
            src=''
          />
          <h1 className='ml-2  font-medium'>Hamza Ali</h1>
        </div>{' '}
        <hr className='h-px  bg-gray-200 border-0 dark:bg-gray-700'></hr>
        <div className='h-[80%]  '></div>
        <div className=' h-[10%]  rounded-br-lg flex items-center justify-center gap-1'>
          <Input
            className='w-[90%] h-[70%] '
            placeholder='Enter your text here'
          />
          <Button variant='outline'>Submit</Button>
        </div>{' '}
        {/* for search area*/}
      </div>
    </Fragment>
  );
}
