import { useMemo } from "react";
import HotelCard from "./HotelCard";
import Title from "./Title";
import useAppContext from "../context/useAppContext";

const RecommendedHotels = () => {
  const { rooms, searchedCities } = useAppContext();

  const recommendedRooms = useMemo(() => {
    return rooms.filter((room) => searchedCities.includes(room.hotel.city));
  }, [rooms, searchedCities]);

  if (recommendedRooms.length === 0) return null;

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 py-20 bg-slate-50">
      <Title
        title="Featured Destination"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione minima doloribus animi sint officia ex iusto tenetur, quae eius velit dolorem expedita."
      />
      <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
        {recommendedRooms.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedHotels;
