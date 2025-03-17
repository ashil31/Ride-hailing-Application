import map from "../assets/uber_map.png";
import logo from "../assets/uber_logo.png";
import { Link } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";

const CaptainHome = () => {

    const [ridePopupPanel, setRidePopupPanel] = useState(true);
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
    const ridePopupPanelRef = useRef(null);
    const confirmRidePopupPanelRef = useRef(null);
    

    useGSAP(function() {
        gsap.to(ridePopupPanelRef.current, {
          translateY:ridePopupPanel? "0%": "100%",
        });
      },[ridePopupPanel]);
    useGSAP(function() {
        gsap.to(confirmRidePopupPanelRef.current, {
          translateX:confirmRidePopupPanel? "0%": "100%",
        });
      },[confirmRidePopupPanel]);

  return (
    <div className="h-screen">
      <div className="fixed p-3 top-0 flex items-center justify-between w-full">
        <img src={logo} className="w-20" alt="" />
        <Link
          to="/captain-login"
          className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-[#e3e4e372] hover:shadow-lg"
        >
          <IoLogOut className="text-2xl" />
        </Link>
      </div>

      <div className="h-3/5">
        {/*  Image is on temporary base */}
        <img src={map} className="h-full w-full object-cover" alt="" />
      </div>
      <div className="h-2/5 pl-4 pr-4 pt-1">
        <CaptainDetails />
      </div>
      <div ref={ridePopupPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-2">
        <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>
      <div ref={confirmRidePopupPanelRef} className="fixed h-screen w-full z-10 bottom-0 translate-x-full bg-white px-3 py-10 pt-2">
        <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div>
    </div>
  );
};

export default CaptainHome;
