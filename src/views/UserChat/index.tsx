import { Fragment, useEffect, useState } from 'react';

//componenets imports
import { AvatarDemo } from '@/components/Avatar';
import { ChatBubble } from '@/components/ChatBubble';

//shadcn imports
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

//next imports
import { useSearchParams } from 'next/navigation';
//axios imports
import axios from 'axios';
//toast imports
import toast from 'react-hot-toast';

//interface imports

import { clientSocket } from '@/socket';

import { getCookieFn } from '@/utils/storage.util';
import { IReceiveChat } from '@/types/Interfaces/chat.interface';

export default function UserChatView() {
  const [chats, setChats] = useState<IReceiveChat[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useSearchParams();
  const token = getCookieFn('user');
  const userId = token && JSON.parse(token);
  const id = router.get('id');
  const [msg, setMsg] = useState('');

  const getPrevMessage = async () => {
    try {
      const prev = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/messages/room/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getCookieFn('accessToken')}`,
          },
        },
      );

      if (prev.status == 200) {
        setChats(prev.data);
        console.log(chats);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPrevMessage();
  }, [id]);

  useEffect(() => {
    clientSocket.emit(
      'JOIN_SINGLE_ROOM',
      {
        type: 'direct',
        roomId: id,
      },
      (res: any) => {
        res && console.log('Room joined', id);
      },
    );
    clientSocket.on('RECEIVED_MESSAGE', (e: IReceiveChat) => {
      console.log(e);
    });
  }, [id]);

  const handleSubmitClick = async () => {
    if (msg == '') return toast('Message box is empty');
    clientSocket.emit(
      'NEW_MESSAGE',
      {
        roomId: id,
        message: msg,
      },
      (res: any) => {
        res && console.log('msg sent');
        setMsg('');
      },
    );
  };

  return (
    <Fragment>
      <div className='flex flex-col align-items justify-center w-full h-full rounded-tr-2xl  bg-customGray '>
        {id ? (
          <Fragment>
            <div className=' h-[10%] rounded-tr-2xl flex items-center  justify-start'>
              <AvatarDemo
                className=' w-[44px] h-[44px] ml-4'
                src=''
              />
              <h1 className='ml-2  font-medium'>{id}</h1>
            </div>

            <hr className='h-px  bg-gray-200 border-0 dark:bg-gray-700'></hr>
            <div className='min-h-[80%]  overflow-y-auto custom-scrollbar'>
              {chats.map(chat => (
                <ChatBubble
                  key={chat.id}
                  msg={chat.text}
                  sentBy={userId == chat.createdBy ? true : false}
                />
              ))}
            </div>
            <div className=' h-[10%]  rounded-br-lg flex items-center justify-center gap-1'>
              <Input
                className='w-[90%] '
                value={msg}
                placeholder='Enter your text here'
                onChange={e => {
                  setMsg(e.target.value);
                }}
              />{' '}
              {/* textbox for messaging*/}
              <Button
                variant='outline'
                onClick={handleSubmitClick}
              >
                Submit
              </Button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className='flex items-center justify-center'>
              <p>No chats to show</p>
            </div>
          </Fragment>
        )}{' '}
        {/* for search area*/}
      </div>
    </Fragment>
  );
}
