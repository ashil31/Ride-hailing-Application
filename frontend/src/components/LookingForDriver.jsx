import { BsChevronCompactDown } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaLocationPinLock } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import car from "../assets/Uber_car.png";

const LookingForDriver = (props) => {
  return (
    <div>
      <div
        onClick={() => props.setVehicleFoundPanel(false)}
        className="flex justify-center items-center text-3xl"
      >
        {" "}
        <BsChevronCompactDown className="w-full" />{" "}
      </div>
      <div className="flex justify-center">
        <h3 className="text-2xl font-semibold mb-3">Looking for nearby driver</h3>
      </div>
      <div className="flex flex-col items-center justify-between gap-3">
        <img src={car} className="h-20" alt="" />
        <div className="w-full mt-5">
          <div className="flex items-center gap-3 p-3 border-b-2">
            <FaMapMarkerAlt className="text-gray-900 text-lg" />
            <div className="w-full">
              <h3 className="font-semibold text-lg">PICKUP</h3>
              <p className="font-normal text-gray-600">
              {(props.pickup.slice(0,50))+" ..."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border-b-2">
            <FaLocationPinLock className="text-gray-900 text-lg" />
            <div className="w-full">
              <h3 className="font-semibold text-lg">DESTINATION</h3>
              <p className="font-normal text-gray-600">
              {(props.destination.slice(0,50)+ " ...")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3">
            <MdOutlinePayment className="text-gray-900 text-lg" />
            <div className="w-full">
              <h3 className="font-semibold text-lg">₹{props.fare[props.vehicleType]}</h3>
              <p className="font-normal text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
