import map from "../assets/uber_map.png";
import logo from "../assets/uber_logo.png";
import { Link } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketIOContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.emit("join", { userType: "captain", userId: captain?._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit('update-location-captain', {
            userId: captain?._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();



    return () => {
      clearInterval(locationInterval);
      // socket.off("new-ride");
    };
  }, []);

  socket.on("new-ride", (data) => {
    console.log(data);
    setRide(data);
    setRidePopupPanel(true);
  });
  async function confirmRide() {
    console.log(captain?._id);    
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride?._id,
        captainId: captain?._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // setRidePopupPanel(false);
    // setConfirmRidePopupPanel(true);

    if (response.status === 200 || response.status === 201) {
      setConfirmRidePopupPanel(true);
      setRidePopupPanel(false);
          console.log(captain);
    }
  }
  // socket.on("new-ride", (data) => {
  //   console.log(data);
  //   // setConfirmRidePopupPanel(true);
  //   // setRidePopupPanel(false);
  // });
  useGSAP(
    function () {
      gsap.to(ridePopupPanelRef.current, {
        translateY: ridePopupPanel ? "0%" : "100%",
      });
    },
    [ridePopupPanel]
  );
  useGSAP(
    function () {
      gsap.to(confirmRidePopupPanelRef.current, {
        translateX: confirmRidePopupPanel ? "0%" : "100%",
      });
    },
    [confirmRidePopupPanel]
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

      <div className="h-3/5">
        {/*  Image is on temporary base */}
        {/* <img src={map} className="h-full w-full object-cover" alt="" /> */}
        <LiveTracking />
      </div>
      <div className="h-2/5 pl-4 pr-4 pt-1">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-2"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed h-screen w-full z-10 bottom-0 translate-x-full bg-white px-3 py-10 pt-2"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
