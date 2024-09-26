import { Fragment } from 'react';

export const ChatBubble = ({
  msg,
  sentBy,
}: {
  msg: string;
  sentBy: boolean;
}) => {
  const sender: string = sentBy ? 'justify-start' : 'justify-end mr-2';
  const bubble: string = sentBy
    ? 'rounded-e-xl rounded-es-xl'
    : 'rounded-ee-xl rounded-s-xl';

  const bubbleColor: string = sentBy ? 'bg-[#E8B86D]' : 'bg-[#FCDE70]';

  return (
    <Fragment>
      <div className={`flex items-start ${sender}  gap-2.5 `}>
        <div
          className={`mt-1 ml-1 flex flex-col w-full max-w-[220px] ${bubbleColor} leading-1.5 p-4 border-gray-200  ${bubble}  dark:bg-gray-700`}
        >
          <div className='flex items-center space-x-2 rtl:space-x-reverse'></div>
          <p className='text-sm font-normal py-2.5 text-gray-900 dark:text-white'>
            {msg}
          </p>
        </div>
      </div>
    </Fragment>
  );
};
