import { Outlet } from "react-router-dom";
import Sidebar from "../../components/hotelOwner/Sidebar";
import Navbar from "../../components/hotelOwner/Navbar";
import useAppContext from "../../context/useAppContext";
import { useEffect } from "react";

const Layout = () => {
  const { isOwner, navigate } = useAppContext();

  useEffect(() => {
    if (!isOwner) {
      navigate("/");
    }
  }, [isOwner, navigate]);
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
