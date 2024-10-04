import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { getDataSource } from './src/data-source';
import { getTokenData } from './src/utils/helpers.util';
import { DataSource, Repository } from 'typeorm';
import { RoomEntity } from './src/entity/Room.entity';
import { MessageEntity } from './src/entity/Message.entity';
import { FriendEntity } from './src/entity/Friend.entity';

const app = express();
const server = http.createServer(app);
app.use(cors());

// DB INITIALIZATION
let AppDataSource: DataSource;
getDataSource()
  .then(dataSource => {
    AppDataSource = dataSource;
  })
  .catch(error => console.error(error));

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

//server initialization
const PORT = process.env.PORT || 3001;
server.listen(PORT, async () => {
  try {
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
});

//sockets

io.on('connection', (socket: Socket) => {
  console.log('A user connected');
  //getting the token

  //creating repos for interacting Dbs
  const roomRepo: Repository<RoomEntity> =
    AppDataSource.getRepository(RoomEntity);
  const messageRepo: Repository<MessageEntity> =
    AppDataSource.getRepository(MessageEntity);
  const friendRepo: Repository<FriendEntity> =
    AppDataSource.getRepository(FriendEntity);

  //for creating room in db
  socket.on('create_room', async ({ name, participantId }) => {
    try {
      const token = socket.handshake.headers.authorization?.split(' ')[1];
      const data = await getTokenData(token || '');
      if (!data) return console.log('invalid user token');

      //creates a room in db
      const Room = new RoomEntity(name, data.id, participantId);
      const res = await roomRepo.save(Room);
      const Friend = new FriendEntity(data.id, participantId);
      const friendRes = await friendRepo.save(Friend);
      console.log(res, friendRes);
    } catch (error) {
      console.log(error);
    }
  });

  //finds the room stored in db => joins the requested person to roomId
  socket.on('single_room', async ({ roomId }) => {
    try {
      const token = socket.handshake.headers.authorization?.split(' ')[1];
      const data = await getTokenData(token || '');
      if (!data) return console.log('invalid user token');

      ///finds a room in db
      const res = await roomRepo
        .createQueryBuilder('room_entity')
        .where('room_entity.id=:roomId', { roomId })
        .andWhere(
          '(room_entity.createdBy=:createdBy or room_entity.participant=:participantId)',
          { createdBy: data.id, participantId: data.id },
        )
        .getOne();
      console.log(res);

      //once room created joins the room
      socket.join(res?.id || ''); // to join that room
    } catch (error) {
      console.log(error);
    }
  });

  //creates a message in db and emits msg in to the room
  socket.on('send-message', async ({ roomId, msg }) => {
    try {
      const token = socket.handshake.headers.authorization?.split(' ')[1];
      const data = await getTokenData(token || '');
      if (!data) return console.log('invalid user token');

      //sends message to roomId
      socket.to(roomId).emit('receive-message', { msg });

      //saves the message in db
      const Message = new MessageEntity(roomId, data.id, msg);
      const res = await messageRepo.save(Message);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
