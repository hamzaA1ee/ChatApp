export interface IRooms {
  createdBy: string;
  created_at: string;
  id: string;
  name: string;
  type: string;
}

export interface IReceiveChat {
  id: string;
  roomId: string;
  text: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
