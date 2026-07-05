import { useNavigate } from "react-router-dom";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import type { IRooms } from "../interfaces/rooms.interface";
import type { FacilityName } from "../assets/assets";
import { useState } from "react";
import type { ICheckboxProps } from "../interfaces/checkboxProps.interface";
import type { IRadioButtonProps } from "../interfaces/radioButtonProps.interface";
import Star from "../components/Star";

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

const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suit"];
const priceRanges = ["0 to 500", "500 to 1000", "1000 to 2000", "2000 to 3000"];
const sortOptions = ["Price Low to High", "Price High to Low", "Newest First"];

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);

  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("");

  const handleRoomTypeChange = (checked: boolean, label: string) => {
    if (checked) {
      setSelectedRoomTypes((prev) => [...prev, label]);
    } else {
      setSelectedRoomTypes((prev) => prev.filter((item) => item !== label));
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-36 px-4 md:px-16 lg:px-24 xl:px-32 gap-10">
      <div className="flex-1 w-full">
        <div className="flex flex-col items-start text-left">
          <h1 className="font-playfair text-4xl md:text-[40px]">Hotel Rooms</h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-[700px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequatur, id eveniet inventore, unde nostrum commodi, asperiores
            atque nisi quaerat sunt exercitationem quidem!
          </p>
        </div>

        {roomsDummyData.map((room: IRooms) => (
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
                ${room.pricePerNight}{" "}
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
              onClick={() => {
                setSelectedRoomTypes([]);
                setSelectedPrice("");
                setSelectedSort("");
              }}
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
            {roomTypes.map((room, index) => (
              <Checkbox
                key={index}
                label={room}
                selected={selectedRoomTypes.includes(room)}
                onChange={handleRoomTypeChange}
              />
            ))}
          </div>

          <div className="px-5 pt-6">
            <p className="font-semibold text-xs uppercase tracking-wider text-gray-800 pb-2">
              Price Range
            </p>
            {priceRanges.map((range, index) => (
              <RadioButton
                key={index}
                label={`$ ${range}`}
                selected={selectedPrice === `$ ${range}`}
                onChange={(label) => setSelectedPrice(label)}
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
                onChange={(label) => setSelectedSort(label)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
