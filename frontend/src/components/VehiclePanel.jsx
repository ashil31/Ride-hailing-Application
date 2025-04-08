import car from "../assets/Uber_car.png";
import motor from "../assets/Uber_bike.png";
import auto from "../assets/Uber_auto.png";
import { FaUser } from "react-icons/fa";
import { BsChevronCompactDown } from "react-icons/bs";

const VehiclePanel = (props) => {
  return (
    <div>
      <div
        onClick={() => props.setVehiclePanel(false)}
        className="flex justify-center items-center text-3xl"
      >
        {" "}
        <BsChevronCompactDown className="w-full" />{" "}
      </div>

      <h3 className="text-2xl font-semibold mb-3">Choose Vehicle</h3>
      {/* car */}
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectVehicle('car');
        }}
        className="flex items-center justify-between w-full mb-2 p-3 hover:shadow-lg hover:border-2 hover:border-black hover:rounded-xl "
      >
        <img src={car} className="h-14" alt="" />
        <div className="w-1/2">
          <h4 className="font-medium text-lg">
            UberGo{" "}
            <span className="inline-flex items-center gap-1 text-sm">
              <FaUser />4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{props.fare.car}</h2>
      </div>
      {/* motor */}
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectVehicle('motorcycle');
        }}
        className="flex items-center justify-between w-full mb-2 p-3 hover:shadow-lg hover:border-2 hover:border-black hover:rounded-xl "
      >
        <img src={motor} className="h-14" alt="" />
        <div className="w-1/2">
          <h4 className="font-medium text-lg">
            Moto{" "}
            <span className="inline-flex items-center gap-1 text-sm">
              <FaUser />1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, motorcycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{props.fare.motorcycle}</h2>
      </div>
      {/* auto */}
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectVehicle('auto');
        }}
        className="flex items-center justify-between w-full mb-2 p-3 hover:shadow-lg hover:border-2 hover:border-black hover:rounded-xl "
      >
        <img src={auto} className="h-14" alt="" />
        <div className="w-1/2">
          <h4 className="font-medium text-lg">
            UberAuto{" "}
            <span className="inline-flex items-center gap-1 text-sm">
              <FaUser />3
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, Auto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{props.fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
