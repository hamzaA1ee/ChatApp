import type { Server as HTTPServer } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Socket as NetSocket } from 'net';
import { Server as IOServer } from 'socket.io';
import { NextResponse } from 'next/server';

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextResponse {
  socket: SocketWithIO;
}

let io: IOServer;

export const socketHanlder = (res: NextApiResponseWithSocket) => {
  try {
    if (res.socket?.server.io == undefined) {
      console.log('Initializing Server...');
      const httpServer = res.socket?.server;
      io = new IOServer(httpServer);

      io.on('connection', socket => {
        console.log('connection listening', socket.id);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
