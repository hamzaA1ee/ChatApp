import { getCookie } from 'cookies-next';
import { io } from 'socket.io-client';
export const clientSocket = io(`localhost:3001`, {
  extraHeaders: {
    Authorization: `Bearer ${getCookie('accessToken')}`,
  },
});
