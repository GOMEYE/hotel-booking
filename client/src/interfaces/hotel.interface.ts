import type { IUser } from "./user.interface";

export interface IHotel {
  _id: string;
  name: string;
  owner: IUser;
  address: string;
  contact: string;
  city: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
