import { useContext, useRef, useState } from "react";
import axios from "axios";
import logo from "../assets/uber_logo.png";
import map from "../assets/uber_map.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BsChevronCompactDown } from "react-icons/bs";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import WaitingForDriver from "../components/WaitingForDriver";
import LookingForDriver from "../components/LookingForDriver";
import { SocketContext } from "../context/SocketIOContext";
import { useEffect } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panel, setPanel] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState("");

  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFoundPanel, setVehicleFoundPanel] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });

    socket.on("ride-confirmed", (ride) => {
      console.log("Ride confirmed", ride);
      setVehicleFoundPanel(false);
      setWaitingForDriver(true);
      setRide(ride);
    });   
  }, [user]);

  socket.on("ride-started", (ride) => {
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } });
  });

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleInputChange = async (e, field) => {
    const value = e.target.value;
    if (field === "pickup") {
      setPickup(value);
    } else {
      setDestination(value);
    }
    setActiveField(field);
    if (value.length >= 3) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: {
              input: value,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSuggestions(res.data.suggestions || []);
      } catch (err) {
        console.error(err);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    // Support both string suggestion or object with description property
    const text = suggestion.description ? suggestion.description : suggestion;
    if (activeField === "pickup") {
      setPickup(text);
    } else if (activeField === "destination") {
      setDestination(text);
    }
    setSuggestions([]);
    setActiveField("");
  };

  useGSAP(
    function () {
      gsap.to(panelRef.current, {
        height: panel ? "70%" : "4%",
        padding: panel ? "22" : "0",
      });
    },
    [panel]
  );

  useGSAP(
    function () {
      gsap.to(vehiclePanelRef.current, {
        translateY: vehiclePanel ? "0%" : "100%",
      });
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      gsap.to(confirmRideRef.current, {
        translateY: confirmRidePanel ? "0%" : "100%",
      });
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      gsap.to(vehicleFoundRef.current, {
        translateY: vehicleFoundPanel ? "0%" : "100%",
      });
    },
    [vehicleFoundPanel]
  );

  useGSAP(
    function () {
      gsap.to(waitingForDriverRef.current, {
        translateY: waitingForDriver ? "0%" : "100%",
      });
    },
    [waitingForDriver]
  );

  async function findTrip() {
    setVehiclePanel(true);
    setPanel(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: {
          pickup,
          destination,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setFare(response.data.fare);
    console.log(response.data);
  }

  async function createRide() {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      console.log("Error creating ride");      
      console.error(err);
    }
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <img src={logo} className="w-20 absolute top-5 left-5" alt="" />
      <div className="absolute h-2/3 w-screen ">
        {/* <img src={map} className="h-full w-full object-cover" alt="" /> */}
        <LiveTracking />
      </div>
      <div className="flex flex-col justify-end absolute h-screen top-0 w-full">
        <div className="h-[30%] p-5 bg-white relative">
          {!panel ? (
            <h4 className="text-2xl font-semibold">Find a trip</h4>
          ) : (
            <BsChevronCompactDown
              className="text-2xl"
              onClick={() => setPanel(false)}
            />
          )}
          <form onSubmit={submitHandler}>
            <div
              className={`absolute bg-gray-800 shadow-lg rounded-full h-5 w-5 ${
                panel ? "top-[29%] left-8" : "top-[38%] left-8"
              }`}
            ></div>
            <div
              className={`line absolute h-16 w-1 ${
                panel ? "top-[35%] left-10" : "top-[42%] left-10"
              } rounded-2xl bg-gray-800`}
            ></div>
            <input
              type="text"
              value={pickup}
              onChange={(e) => handleInputChange(e, "pickup")}
              onClick={() => {
                setPanel(true);
                setActiveField("pickup");
              }}
              placeholder="Enter your destination"
              className="bg-[#eee] px-12 py-2 text-base rounded-full w-full mt-3"
            />
            <input
              type="text"
              value={destination}
              onChange={(e) => handleInputChange(e, "destination")}
              onClick={() => {
                setPanel(true);
                setActiveField("destination");
              }}
              placeholder="Add a pick-up location"
              className="bg-[#eee] px-12 py-2 text-base rounded-full w-full mt-5"
            />
          </form>
          <div className="h-14 bg-white shadow-xl shadow-white w- mt-2 relative">
            <button
              onClick={findTrip}
              className=" absolute -top-5 w-full mt-5 rounded-xl bg-[#3beb53] text-black font-semibold p-2"
            >
              Find Trip
            </button>
          </div>
        </div>
        <div ref={panelRef} className="bg-white overflow-scroll">
          <LocationSearchPanel
            suggestions={suggestions}
            onSelect={handleSuggestionSelect}
            setPanel={setPanel}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-5"
      >
        <VehiclePanel
          fare={fare}
          selectVehicle={setVehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>
      <div
        ref={confirmRideRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-5"
      >
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFoundPanel={setVehicleFoundPanel}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-5"
      >
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFoundPanel={setVehicleFoundPanel}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-5"
      >
        <WaitingForDriver
          ride={ride}
          setVehicleFoundPanel={setVehicleFoundPanel}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
