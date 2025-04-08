import { BsChevronCompactDown } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaLocationPinLock } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import profile from "../assets/profile.png";

const RidePopUp = (props) => {
  return (
    <div className="p-1">
      <div
        onClick={() => props.setRidePopupPanel(false)}
        className="flex justify-center items-center text-xl"
      >
        {" "}
        <BsChevronCompactDown className="w-full" />{" "}
      </div>
      <h3 className="text-center text-2xl font-semibold mb-3">
        New Ride Available
      </h3>
      <div className="flex justify-between items-center mt-2 bg-[#ebd43b] p-3 rounded-xl">
        <div className="flex items-center gap-2">
          <img
            src={profile}
            className="h-11 w-11 rounded-full object-cover"
            alt=""
          />
          <h4 className="font-medium text-lg">
            {props.ride?.user?.fullName.firstName}{" "}{props.ride?.user?.fullName.lastName}
          </h4>
        </div>
        <h5 className="text-lg font-medium">2.2 KM</h5>
      </div>

      {/* Ride Details */}
      <div className="flex flex-col items-center justify-between gap-3">
        <div className="w-full mt-2">
          <div className="flex items-center gap-3 p-3 border-b-2">
            <FaMapMarkerAlt className="text-gray-900 text-lg" />
            <div className="w-full">
              <h3 className="font-semibold text-base">PICKUP</h3>
              <p className="text-sm font-normal text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border-b-2">
            <FaLocationPinLock className="text-gray-900 text-lg" />
            <div className="w-full">
              <h3 className="font-semibold text-base">DESTINATION</h3>
              <p className="text-sm font-normal text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3">
            <MdOutlinePayment className="text-gray-900 text-lg" />
            <div className="w-full">
              <h3 className="font-semibold text-base">₹{props.ride?.fare}</h3>
              <p className="text-sm font-normal text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 w-full">
          <button
            onClick={() => {
              props.setConfirmRidePopupPanel(true);
              props.confirmRide();
            }}
            className="w-40 rounded-xl bg-[#3beb53] text-black font-semibold p-2"
          >
            Accept
          </button>
          <button
            onClick={() => {
              props.setRidePopupPanel(false);
            }}
            className="w-40 rounded-xl bg-[#eb3b3b] text-black font-semibold p-2"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
