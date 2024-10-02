import { Server as NetServer } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Socket as NetSocket, Server as ActualNetServer } from 'net';
import { Server as IOServer } from 'socket.io';
import { NextResponse } from 'next/server';

type NextApiResponseWithSocket = NextApiResponse & {
  socket: NetSocket & {
    server: ActualNetServer & {
      io: IOServer;
    };
  };
};

let io: IOServer;

export const socketHandler = (
  req: NextApiRequest,
  res: NextApiResponseWithSocket,
) => {
  console.log('response', res.socket?.server.io);
  try {
    if (!res.socket?.server.io) {
      const path = 'api/socket/io';

      const httpServer: NetServer = res.socket?.server as any;
      io = new IOServer(httpServer, {
        path,
        //@ts-ignore
        addTrailingSlash: false,
      });

      res.socket.server.io = io;
    }

    res.end();
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

// import type { NextApiRequest, NextApiResponse } from 'next';

// import { Server } from 'socket.io';

// interface NextApiResponseWithSocket extends NextApiResponse {
//     socket: SocketWithIO
//   }

//   export interface SocketServer extends HTTPServer {
//     io?: IOServer | undefined
//   }

//   export interface SocketWithIO extends NetSocket {
//     server: SocketServer
//   }

// export default function GET(_req: NextApiRequest, res: any) {
//   console.log('res', res.socket.server);
//   if (res.socket.server.io) {
//     res.end();
//     return;
//   }
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
//   const io = new Server(res.socket.server);

//   // Event handler for client connections
//   io.on('connection', socket => {
//     const clientId = socket.id;
//     console.log(`client connected. ID: ${clientId}`);
//     // Event handler for receiving messages from the client
//     socket.on('message', data => {
//       console.log('Received message From Client:', data);
//     });

//     // eslint-disable-next-line @typescript-eslint/dot-notation

//     // Event handler for client disconnections
//     socket.on('disconnect', () => {
//       console.log('client disconnected.');
//     });
//   });

//   // Monkey patching to access socket instance globally.
//   (global as any).io = io;
//   res.socket.server.io = io;
//   res.end();

//   res.send({});
// }
