import map from "../assets/uber_map.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaLocationPinLock } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import car from "../assets/Uber_car.png";
import { AiFillHome } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { SocketContext } from "../context/SocketIOContext";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {

  const location = useLocation();
  const { ride } = location.state || {};
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("ride-ended", () => {
      navigate("/home");
    });

    return () => {
      socket.off("ride-ended");
    };
  }, []);

  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 flex items-center justify-center rounded-full hover:bg-[#e3e4e372] hover:shadow-lg"
      >
        <AiFillHome />
      </Link>

      <div className="h-1/2">
        {/*  Image is on temporary base */}
        {/* <img src={map} className="h-full w-full object-cover" alt="" /> */}
        <LiveTracking />
      </div>
      <div className="h-1/2 pl-4 pr-4 pt-8">
        <div className="flex items-center justify-between ">
          <div className="">
            <img src={car} className="h-14" alt="" />
          </div>
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">{ride?.captain.fullName.firstName} {" "} {ride?.captain.fullName.lastName} </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate}</h4>
            <p className="text-sm text-gray-600">{ride?.captain?.vehicle.vehicleType}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3">
          <div className="w-full mt-3">
            <div className="flex items-center gap-3 p-2 border-b-2">
              <FaMapMarkerAlt className="text-gray-900 text-lg" />
              <div className="w-full">
                <h3 className="font-semibold text-base">DESTINATION</h3>
                <p className="font-normal text-sm text-gray-600">
                 {ride?.destination}
                </p>
              </div>
            </div>
            {/* <div className="flex items-center gap-3 p-2 border-b-2">
              <FaLocationPinLock className="text-gray-900 text-lg" />
              <div className="w-full">
                <h3 className="font-semibold text-base">Starbucks</h3>
                <p className="font-normal text-sm text-gray-600">
                  Los Angeles, California
                </p>
              </div>
            </div> */}
            <div className="flex items-center gap-3 p-2">
              <MdOutlinePayment className="text-gray-900 text-lg" />
              <div className="w-full">
                <h3 className="font-semibold text-base">₹{ride?.fare}</h3>
                <p className="font-normal text-sm text-gray-600">Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full mt-3 rounded-xl bg-[#3beb53] text-black font-semibold p-2">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
