import { Fragment, useEffect, useState } from 'react';
import { AvatarDemo } from '@/components/Avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { clientSocket } from '@/socket';
import { getCookieFn } from '@/utils/storage.util';
import { IReceiveChat } from '@/types/Interfaces/chat.interface';
import { getTokenData } from '../../utils/helpers.util';
import { ITokenPayLoad } from '@/types/Interfaces/user.interface';

export default function UserChatView() {
  const [chats, setChats] = useState<IReceiveChat[]>([]);
  const [tokenData, setTokenData] = useState<ITokenPayLoad | null>(null);
  const router = useSearchParams();
  const token = getCookieFn('accessToken');
  const id = router.get('id');
  const [msg, setMsg] = useState('');

  const getPrevMessage = async () => {
    try {
      const tokenData = await getTokenData(token || '');
      setTokenData(tokenData);
      const prev = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/chat/msg/get/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getCookieFn('accessToken')}`,
          },
        },
      );

      if (prev.status === 200) {
        setChats(prev.data.msgs);
        console.log(prev.data.msgs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) getPrevMessage();
  }, [id]);

  useEffect(() => {
    if (id) {
      clientSocket.emit('single_room', { roomId: id }, (res: any) => {
        console.log('Room joined', id);
      });
    }
  }, [id]);

  useEffect(() => {
    const handleReceiveMessage = (res: IReceiveChat) => {
      console.log(res);
      setChats(prevChats => [...prevChats, res]);
    };

    clientSocket.on('receive-message', handleReceiveMessage);

    // Cleanup function to remove the listener on component unmount
    return () => {
      clientSocket.off('receive-message', handleReceiveMessage);
    };
  }, [chats, id]);

  const handleSubmitClick = async () => {
    if (msg === '') return toast('Message box is empty');
    clientSocket.emit('send-message', { roomId: id, msg: msg }, (res: any) => {
      res && console.log('msg sent');
    });
    setMsg('');
  };

  return (
    <Fragment>
      <div className='flex flex-col align-items justify-center w-full h-full rounded-tr-2xl bg-customGray'>
        {id ? (
          <Fragment>
            <div className='h-[10%] rounded-tr-2xl flex items-center justify-start'>
              <AvatarDemo
                className='w-[44px] h-[44px] ml-4'
                src=''
              />
              <h1 className='ml-2 font-medium'>{id}</h1>
            </div>
            <hr className='h-px bg-gray-200 border-0 dark:bg-gray-700' />
            <div className='min-h-[80%] overflow-y-auto custom-scrollbar flex flex-col'>
              {chats
                .sort(
                  (a: IReceiveChat, b: IReceiveChat) =>
                    new Date(a.createdTime)?.getTime() -
                    new Date(b.createdTime)?.getTime(), // Convert to Date for comparison
                )
                .map(sendmsgs => (
                  <div
                    key={sendmsgs.id}
                    className={`p-3 rounded-lg mt-2 ${
                      tokenData?.id === sendmsgs.createdBy
                        ? 'self-end bg-[#F3C623] text-white'
                        : 'bg-[#EB8317] text-white self-start'
                    } max-w-xs`}
                  >
                    <p>{sendmsgs.msg}</p>
                  </div>
                ))}
            </div>
            <div className='h-[10%] rounded-br-lg flex items-center justify-center gap-1'>
              <Input
                className='w-[90%]'
                value={msg}
                placeholder='Enter your text here'
                onChange={e => setMsg(e.target.value)}
              />
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
        )}
      </div>
    </Fragment>
  );
}
