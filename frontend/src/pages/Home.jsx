import { useRef, useState } from "react";
import logo from "../assets/uber_logo.png";
import map from "../assets/uber_map.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RiArrowDownSLine } from "react-icons/ri";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import WaitingForDriver from "../components/WaitingForDriver";
import LookingForDriver from "../components/LookingForDriver";



const Home = () => {

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panel, setPanel] = useState(false);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFoundPanel, setVehicleFoundPanel] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(function() {
    gsap.to(panelRef.current, {
      height:panel? "70%": "0%",
      padding: panel? "22": "0",
    });
  },[panel]);

  useGSAP(function() {
    gsap.to(vehiclePanelRef.current, {
      translateY:vehiclePanel? "0%": "100%",
    });
  },[vehiclePanel]);
  useGSAP(function() {
    gsap.to(confirmRideRef.current, {
      translateY:confirmRidePanel? "0%": "100%",
    });
  },[confirmRidePanel]);
  useGSAP(function() {
    gsap.to(vehicleFoundRef.current, {
      translateY:vehicleFoundPanel? "0%": "100%",
    });
  },[vehicleFoundPanel]);
  useGSAP(function() {
    gsap.to(waitingForDriverRef.current, {
      translateY:waitingForDriver? "0%": "100%",
    });
  },[waitingForDriver]);

  return (
    <div className="h-screen relative overflow-hidden">
      <img src={logo} className="w-20 absolute top-5 left-5" alt="" />
      <div className="h-screen w-screen">
        {/*  Image is on temporary base */}
        <img src={map} className="h-full w-full object-cover" alt="" />
      </div>
      <div className="flex flex-col justify-end absolute h-screen top-0 w-full">
        <div className="h-[30%] p-5 bg-white relative">
          {
            !panel? <h4 className="text-2xl font-semibold">Find a trip</h4>: <RiArrowDownSLine className="" onClick={() => setPanel(false)} /> 
          }
          <form onSubmit={(e) => submitHandler(e)}>
            <div className={`absolute bg-gray-800 shadow-lg rounded-full h-5 w-5 ${panel? "top-[29%] left-8":"top-[38%] left-8"}`}></div>
            <div className={`line absolute h-16 w-1  ${panel? "top-[35%] left-10":"top-[42%] left-10"}  rounded-2xl bg-gray-800`}></div>
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onClick={() => setPanel(true)}
              placeholder="Enter your destination"
              className="bg-[#eee] px-12 py-2 text-base rounded-full w-full mt-3"
            />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => setPanel(true)}
              placeholder="Add a pick-up location"
              className="bg-[#eee] px-12 py-2 text-base rounded-full w-full mt-5"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white">
          <LocationSearchPanel setPanel={setPanel} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>
      <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-5">
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={confirmRideRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-5">
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFoundPanel={setVehicleFoundPanel} />
      </div>
      <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-5">
        <LookingForDriver setVehicleFoundPanel={setVehicleFoundPanel}/>
      </div>
      <div ref={waitingForDriverRef} className="fixed w-full z-10 bottom-0 bg-white px-3 py-5">
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
