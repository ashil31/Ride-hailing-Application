import logo from "../assets/uber_logo.png";
import { Link } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import map from "../assets/uber_map.png";
import { BsChevronCompactUp } from "react-icons/bs";
import FinishRide from "../components/FinishRide";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  useGSAP(
    function () {
      gsap.to(finishRidePanelRef.current, {
        translateY: finishRidePanel ? "0%" : "100%",
      });
    },
    [finishRidePanel]
  );

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

      <div className="h-4/5">
        {/*  Image is on temporary base */}
        <img src={map} className="h-full w-full object-cover" alt="" />
      </div>
      <div className="h-1/5 pl-4 pr-4 pt-1 bg-yellow-500 flex items-center justify-between relative">
        <div className="flex justify-center absolute w-[90%] top-0 p-1" onClick={() => setFinishRidePanel(true)}>
          <BsChevronCompactUp className="text-3xl text-gray-800" />
        </div>
        <h4 className="text-xl font-semibold">4 KM away</h4>
        <button onClick={() => setFinishRidePanel(true)} className="bg-[#28e040] text-black font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>
      <div ref={finishRidePanelRef} className="fixed h-screen w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-2">
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
