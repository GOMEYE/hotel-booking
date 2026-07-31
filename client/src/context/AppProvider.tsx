import { useCallback, useEffect, useState, type ReactNode } from "react";
import axios from "axios";
import AppContext from "./AppContext";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/react";
import toast from "react-hot-toast";
import type { IRooms } from "../interfaces/rooms.interface";

interface AppProviderProps {
  children: ReactNode;
}

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
console.log(import.meta.env.VITE_BACKEND_URL);

export const AppProvider = ({ children }: AppProviderProps) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState<string[]>([]);
  const [rooms, setRooms] = useState<IRooms[]>([]);

  const fetchRooms = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/rooms");

      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      toast.error(message);
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    let ignore = false;

    const loadUser = async () => {
      try {
        const token = await getToken();
        console.log("TOKEN:", token);
        // console.log("TOKEN TYPE:", typeof token);

        const { data } = await axios.get("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!ignore && data.success) {
          setIsOwner(data.role === "hotelOwner");
          setSearchedCities(data.recentSearchedCities);
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Something went wrong, try again";

        toast.error(message);
      }
    };

    loadUser();

    return () => {
      ignore = true;
    };
  }, [user, getToken]);

  useEffect(() => {
    const loadRooms = async () => {
      await fetchRooms();
    };

    loadRooms();
  }, [fetchRooms]);

  const value = {
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    showHotelReg,
    setShowHotelReg,
    axios,
    searchedCities,
    setSearchedCities,
    rooms,
    setRooms,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// 165500
