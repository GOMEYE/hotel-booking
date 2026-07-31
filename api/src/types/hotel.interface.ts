import type { Types } from "mongoose";

export interface IHotel {
  _id: string;
  name: string;
  address: string;
  contact: string;
  owner: string;
  city: string;
}
