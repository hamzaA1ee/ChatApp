import { Fragment } from 'react';

export const ChatBubble = ({
  msg,
  sentBy,
}: {
  msg: string;
  sentBy: boolean;
}) => {
  const sender: string = sentBy ? 'justify-start' : 'justify-end mr-2';
  const recipentBubble: string = 'rounded-ee-xl rounded-s-xl';
  const senderBubble: string = 'rounded-e-xl rounded-es-xl';
  return (
    <Fragment>
      <div className={`flex items-start ${sender}  gap-2.5 `}>
        <div
          className={`mt-1 ml-1 flex flex-col w-full max-w-[320px] bg-white leading-1.5 p-4 border-gray-200  ${senderBubble}  dark:bg-gray-700`}
        >
          <div className='flex items-center space-x-2 rtl:space-x-reverse'>
            <span className='text-sm font-semibold text-gray-900 dark:text-white'>
              Bonnie Green
            </span>
          </div>
          <p className='text-sm font-normal py-2.5 text-gray-900 dark:text-white'>
            {msg}
          </p>
        </div>
      </div>
    </Fragment>
  );
};
