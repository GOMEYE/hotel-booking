import type { useAuth, useUser } from "@clerk/react";
import type { NavigateFunction } from "react-router-dom";
import type { AxiosStatic } from "axios";
import type { IRooms } from "./rooms.interface";

export interface AppContextType {
  currency: string;
  navigate: NavigateFunction;
  user: ReturnType<typeof useUser>["user"];
  getToken: ReturnType<typeof useAuth>["getToken"];
  isOwner: boolean;
  setIsOwner: React.Dispatch<React.SetStateAction<boolean>>;
  showHotelReg: boolean;
  setShowHotelReg: React.Dispatch<React.SetStateAction<boolean>>;
  searchedCities: string[];
  setSearchedCities: React.Dispatch<React.SetStateAction<string[]>>;
  axios: AxiosStatic;
  rooms: IRooms[];
}
