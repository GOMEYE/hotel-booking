import { Outlet } from "react-router-dom";
import Sidebar from "../../components/hotelOwner/Sidebar";
import Navbar from "../../components/hotelOwner/Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <div className="ml-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
