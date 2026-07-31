import { useCallback, useEffect, useState } from "react";
import type { IRooms } from "../../interfaces/rooms.interface";
// import { roomsDummyData } from "../../assets/assets";
import Title from "../../components/Title";
import useAppContext from "../../context/useAppContext";
import toast from "react-hot-toast";

const ListRoom = () => {
  // const [rooms, setRooms] = useState<IRooms[]>(roomsDummyData);
  const [rooms, setRooms] = useState<IRooms[]>([]);
  const { axios, getToken, user } = useAppContext();

  const loadRooms = useCallback(async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get("/api/rooms/owner", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }, [axios, getToken]);

  useEffect(() => {
    if (!user) return;
    const fetchRooms = async () => {
      await loadRooms();
    };

    fetchRooms();
  }, [user, loadRooms]);

  // Toggle availability of the room
  const toggleAvailability = async (roomId: string, isAvailable: boolean) => {
    const token = await getToken();
    const { data } = await axios.patch(
      `/api/rooms/${roomId}/availability`,
      {
        isAvailable: !isAvailable,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    console.log(data);

    if (data.success) {
      toast.success(data.message);
      loadRooms();
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Room Listing"
        subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem suscipit qui quia beatae ratione laboriosam explicabo eius distinctio."
      />
      <p className="text-gray-500 mt-8">All Rooms</p>

      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Facility
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium">
                Price / Niight
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.roomType}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.amenities.join(", ")}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.pricePerNight}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 items-center">
                  <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                    <input
                      onChange={() =>
                        toggleAvailability(item._id, item.isAvailable)
                      }
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.isAvailable}
                    />
                    <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                    <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
