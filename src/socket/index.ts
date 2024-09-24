import { getCookie } from 'cookies-next';
import { io } from 'socket.io-client';
export const clientSocket = io(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
  extraHeaders: {
    Authorization: `Bearer ${getCookie('accessToken')}`,
  },
});
