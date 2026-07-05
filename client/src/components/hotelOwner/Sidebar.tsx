import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const SidebarLinks = [
    { name: "Dashboard", path: "/owner", icon: assets.dashboardIcon },
    { name: "Add Room", path: "/owner/add-room", icon: assets.addIcon },
    { name: "List Room", path: "/owner/list-room", icon: assets.listIcon },
  ];

  return (
    <div className="md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
      {SidebarLinks.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          end={item.path === "/owner"}
          className={({ isActive }) =>
            `flex items-center py-3 px-4 md:px-8 gap-3 border-r-4 md:border-r-[6px] transition-all ${
              isActive
                ? "border-blue-600 bg-blue-50 text-blue-600 font-medium"
                : "border-transparent hover:bg-gray-100/90 text-gray-700"
            }`
          }
        >
          {/* Changed min-h-6 to h-6 to preserve standard aspect ratio */}
          <img
            src={item.icon}
            alt={item.name}
            className="h-6 w-6 object-contain"
          />
          <p className="md:block hidden whitespace-nowrap">{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
