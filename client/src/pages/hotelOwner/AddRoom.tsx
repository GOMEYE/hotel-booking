import { useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import useAppContext from "../../context/useAppContext";
import toast from "react-hot-toast";

const AddRoom = () => {
  const { getToken, axios } = useAppContext();

  const [images, setImages] = useState<Record<string, File | null>>({
    "1": null,
    "2": null,
    "3": null,
    "4": null,
  });

  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Free Wifi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !inputs.roomType ||
      !inputs.pricePerNight ||
      // !inputs.amenities ||
      Object.values(images).every((image) => image === null)
    ) {
      toast.error("Please fill in all the details");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("roomType", inputs.roomType);
      formData.append("pricePerNight", inputs.pricePerNight.toString());

      // Converting amenities to array and keeping only enabled amenities
      const amenities = (
        Object.keys(inputs.amenities) as Array<keyof typeof inputs.amenities>
      ).filter((key) => inputs.amenities[key]);
      formData.append("amenities", JSON.stringify(amenities));

      // Adding images
      (Object.keys(images) as Array<keyof typeof images>).forEach((key) => {
        const image = images[key];

        if (image) {
          formData.append("images", image);
        }
      });

      const token = await getToken();
      console.log(token);

      const { data } = await axios.post("/api/rooms", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(data);

      if (data.success) {
        toast.success(data.message);
        setInputs({
          roomType: "",
          pricePerNight: 0,
          amenities: {
            "Free Wifi": false,
            "Free Breakfast": false,
            "Room Service": false,
            "Mountain View": false,
            "Pool Access": false,
          },
        });
        setImages({ 1: null, 2: null, 3: null, 4: null });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // FIXED: Added onSubmit handler here
    <form onSubmit={onSubmitHandler} className="max-w-4xl pb-12">
      <Title
        align="left"
        font="outfit"
        title="Add Room"
        subTitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur qui eum eaque quasi esse impedit vel dolorum, consequatur voluptate "
      />

      <p className="text-gray-800 font-medium mt-10">Upload Room Images</p>
      <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
        {Object.keys(images).map((key) => (
          <label
            htmlFor={`roomImage${key}`}
            key={key}
            className="cursor-pointer"
          >
            <img
              src={
                images[key]
                  ? URL.createObjectURL(images[key] as File)
                  : assets.uploadArea
              }
              alt=""
              className="w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded flex items-center justify-center hover:border-blue-500 transition-all"
            />
            <input
              type="file"
              accept="image/*"
              id={`roomImage${key}`}
              hidden
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImages({ ...images, [key]: e.target.files[0] });
                }
              }}
            />
          </label>
        ))}
      </div>

      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1 max-w-48">
          <p className="text-gray-800 mt-4 font-medium">Room Type</p>
          <select
            value={inputs.roomType}
            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
            className="border border-gray-300 mt-1 p-2 bg-white rounded w-full outline-none focus:border-blue-500"
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>
        <div>
          <p className="mt-4 text-gray-800 font-medium">
            Price <span className="text-xs text-gray-500">/Night ($)</span>
          </p>
          <input
            type="number"
            placeholder="0"
            min="0"
            value={inputs.pricePerNight || ""}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: Number(e.target.value) })
            }
            className="border border-gray-300 mt-1 w-24 p-2 rounded outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <p className="text-gray-800 font-medium mt-6">Amenities</p>
      {/* Tweaked classes to display amenities in a nice grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 max-w-md">
        {Object.keys(inputs.amenities).map((key, index) => {
          const amenity = key as keyof typeof inputs.amenities;
          return (
            // FIXED: Cleaned up the nested label syntax here. Just one parent label wrapper.
            <label
              key={index}
              htmlFor={`amenities${index}`}
              className="flex items-center gap-3 text-gray-600 cursor-pointer select-none text-sm"
            >
              <input
                type="checkbox"
                id={`amenities${index}`}
                checked={inputs.amenities[amenity]}
                onChange={() =>
                  setInputs({
                    ...inputs,
                    amenities: {
                      ...inputs.amenities,
                      [amenity]: !inputs.amenities[amenity],
                    },
                  })
                }
                className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
              <span>{amenity}</span>
            </label>
          );
        })}
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg mt-8 font-medium shadow-sm transition-colors cursor-pointer"
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add Room"}
      </button>
    </form>
  );
};

export default AddRoom;
