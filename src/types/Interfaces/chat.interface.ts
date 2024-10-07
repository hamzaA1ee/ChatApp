export interface IRooms {
  createdBy: string;
  created_at: string;
  id: string;
  name: string;
  type: string;
  participant: string;
}

export interface IReceiveChat {
  id: string;
  roomId: string;
  msg: string;
  createdBy: string;
  createdTime: Date;
}
