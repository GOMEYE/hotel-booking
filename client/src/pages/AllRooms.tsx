import { useSearchParams } from "react-router-dom";
import { assets, facilityIcons } from "../assets/assets";
import type { IRooms } from "../interfaces/rooms.interface";
import type { FacilityName } from "../assets/assets";
import { useCallback, useMemo, useState } from "react";
import type { ICheckboxProps } from "../interfaces/checkboxProps.interface";
import type { IRadioButtonProps } from "../interfaces/radioButtonProps.interface";
import Star from "../components/Star";
import useAppContext from "../context/useAppContext";

interface SelectedFilter {
  roomType: string[];
  priceRange: string[];
  // amenities: string[];
}

const Checkbox = ({
  label,
  selected = false,
  onChange = () => {},
}: ICheckboxProps) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
        className="w-4 h-4 cursor-pointer accent-black"
      />
      <span className="font-light select-none text-gray-700">{label}</span>
    </label>
  );
};

const RadioButton = ({
  label,
  selected = false,
  onChange = () => {},
}: IRadioButtonProps) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
        className="w-4 h-4 cursor-pointer accent-black"
      />
      <span className="font-light select-none text-gray-700">{label}</span>
    </label>
  );
};

const roomType = ["Single Bed", "Double Bed", "Luxury Room", "Family Suit"];
const priceRanges = ["0 to 500", "500 to 1000", "1000 to 2000", "2000 to 3000"];
const sortOptions = ["Price Low to High", "Price High to Low", "Newest First"];

const AllRooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { rooms, navigate, currency } = useAppContext();

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter>({
    roomType: [],
    priceRange: [],
  });

  const [openFilter, setOpenFilter] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>("");
  // const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  // const [selectedPrice, setSelectedPrice] = useState<string>("");

  // const handleRoomTypeChange = (checked: boolean, label: string) => {
  //   if (checked) {
  //     setSelectedRoomTypes((prev) => [...prev, label]);
  //   } else {
  //     setSelectedRoomTypes((prev) => prev.filter((item) => item !== label));
  //   }
  // };

  // Handle changes for filters and sorting
  const handleFilterChange = (
    checked: boolean,
    value: string,
    type: keyof SelectedFilter,
  ) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [type]: checked
        ? [...prevFilters[type], value]
        : prevFilters[type].filter((item) => item !== value),
    }));
  };

  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
  };

  // Function to check if a room matches selected room type
  const matchesRoomType = useCallback(
    (room: IRooms) => {
      return (
        selectedFilters.roomType.length === 0 ||
        (room.roomType !== undefined &&
          selectedFilters.roomType.includes(room.roomType))
      );
    },
    [selectedFilters.roomType],
  );

  // Function to check if a room matches the selected price range
  const matchesPriceRange = useCallback(
    (room: IRooms) => {
      return (
        selectedFilters.priceRange.length === 0 ||
        selectedFilters.priceRange.some((range) => {
          const [min, max] = range.split("to").map(Number);

          return room.pricePerNight >= min && room.pricePerNight <= max;
        })
      );
    },
    [selectedFilters.priceRange],
  );

  // Function to sort rooms based on the selected sort room
  const sortRooms = useCallback(
    (a: IRooms, b: IRooms) => {
      switch (selectedSort) {
        case "Price Low to High":
          return a.pricePerNight - b.pricePerNight;

        case "Price High to Low":
          return b.pricePerNight - a.pricePerNight;

        case "Newest First":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        default:
          return 0;
      }
    },
    [selectedSort],
  );

  // Filter destination
  const filteredDestination = useCallback(
    (room: IRooms) => {
      const destination = searchParams.get("destination");
      if (!destination) return true;
      return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
    },
    [searchParams],
  );

  // Filter and sort rooms based on the selected filters and sort option
  const filteredRooms = useMemo(() => {
    return rooms
      .filter(
        (room) =>
          matchesRoomType(room) &&
          matchesPriceRange(room) &&
          filteredDestination(room),
      )
      .sort(sortRooms);
  }, [
    filteredDestination,
    matchesPriceRange,
    matchesRoomType,
    rooms,
    sortRooms,
  ]);

  // clear all filters
  const clearFilters = () => {
    setSelectedFilters({
      roomType: [],
      priceRange: [],
    });
    setSelectedSort("");
    setSearchParams({});
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-36 px-4 md:px-16 lg:px-24 xl:px-32 gap-10">
      <div className="flex-1 w-full">
        <div className="flex flex-col items-start text-left">
          <h1 className="font-playfair text-4xl md:text-[40px]">Hotel Rooms</h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-175">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequatur, id eveniet inventore, unde nostrum commodi, asperiores
            atque nisi quaerat sunt exercitationem quidem!
          </p>
        </div>

        {filteredRooms.map((room: IRooms) => (
          <div
            key={room._id}
            className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0"
          >
            <img
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                window.scrollTo(0, 0);
              }}
              src={room.images[0]}
              alt="hotel image"
              title="View Room Details"
              className="max-h-65 md:w-1/2 w-full rounded-xl shadow-lg object-cover cursor-pointer"
            />

            <div className="flex flex-col gap-2 md:w-1/2 w-full">
              <p className="text-gray-500 text-sm tracking-wide uppercase">
                {room.hotel.city}
              </p>
              <p
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  window.scrollTo(0, 0);
                }}
                className="text-gray-800 text-3xl font-playfair cursor-pointer hover:text-black transition-colors"
              >
                {room.hotel.name}
              </p>

              <div className="flex items-center">
                <Star />
                <p className="ml-2 text-sm text-gray-600">200+ reviews</p>
              </div>

              <div className="flex items-center gap-1 text-gray-500 mt-1 text-sm">
                <img
                  src={assets.locationIcon}
                  alt="location icon"
                  className="w-4 h-4"
                />
                <span>{room.hotel.address}</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-3 mb-6">
                {room.amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f5f5ff]/70 border border-gray-100"
                  >
                    <img
                      src={facilityIcons[item as FacilityName]}
                      alt={item}
                      className="w-4 h-4"
                    />
                    <p className="text-xs text-gray-700">{item}</p>
                  </div>
                ))}
              </div>

              <p className="text-xl font-medium text-gray-800">
                {currency}
                {room.pricePerNight}{" "}
                <span className="text-sm font-normal text-gray-500">
                  / Night
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white w-full lg:w-80 border border-gray-300 text-gray-600 lg:mt-16 rounded-xl shadow-sm">
        <div
          className={`flex items-center justify-between px-5 py-3.5 lg:border-b border-gray-300 ${openFilter ? "border-b" : ""}`}
        >
          <p className="text-sm font-semibold tracking-wider text-gray-800">
            FILTERS
          </p>
          <div className="text-xs font-medium cursor-pointer select-none">
            <span
              onClick={() => setOpenFilter(!openFilter)}
              className="lg:hidden text-black underline underline-offset-4"
            >
              {openFilter ? "HIDE" : "SHOW"}
            </span>
            <span
              className="hidden lg:block text-gray-400 hover:text-black transition-colors"
              onClick={() => clearFilters()}
            >
              CLEAR ALL
            </span>
          </div>
        </div>

        <div
          className={`${openFilter ? "h-auto" : "h-0 lg:h-auto"} overflow-hidden transition-all duration-300`}
        >
          <div className="pt-5 px-5">
            <p className="font-semibold text-xs uppercase tracking-wider text-gray-800 pb-2">
              Room Type
            </p>
            {roomType.map((room, index) => (
              <Checkbox
                key={index}
                label={room}
                selected={selectedFilters.roomType.includes(room)}
                onChange={(checked) =>
                  handleFilterChange(checked, room, "roomType")
                }
              />
            ))}
          </div>

          <div className="px-5 pt-6">
            <p className="font-semibold text-xs uppercase tracking-wider text-gray-800 pb-2">
              Price Range
            </p>
            {priceRanges.map((range, index) => (
              <Checkbox
                key={index}
                label={`${currency} ${range}`}
                selected={selectedFilters.priceRange.includes(range)}
                onChange={(checked) =>
                  handleFilterChange(checked, range, "priceRange")
                }
              />
            ))}
          </div>

          <div className="px-5 pt-6 pb-7">
            <p className="font-semibold text-xs uppercase tracking-wider text-gray-800 pb-2">
              Sort By
            </p>
            {sortOptions.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                selected={selectedSort === option}
                onChange={() => handleSortChange(option)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;

// 9:00:39
// Hundred days to a better life

// git branch -M main
// git remote add origin https://github.com/GOMEYE/credit-scoring-project.git
// git push -u origin main
