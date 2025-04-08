import { BsChevronCompactDown } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaLocationPinLock } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import car from "../assets/Uber_car.png";

const WaitingForDriver = (props) => {
  return (
    <div>
          <div
            onClick={() => props.setWaitingForDriver(false)}
            className="flex justify-center items-center text-3xl -mb-6 -mt-3"
          >
            <BsChevronCompactDown className="w-full" />
          </div>
          <div className="flex items-center justify-between p-5">
            <img src={car} className="h-20" alt="" />
            <div className="text-right">
              <h2 className="text-lg font-medium capitalize">{props.ride?.captain?.fullName.firstName}{" "}{props.ride?.captain?.fullName.lastName}</h2>
              <h4 className="text-xl font-semibold -mt-1 -mb-1">{props.ride?.captain?.vehicle.plate}</h4>
              <p className="text-sm text-gray-600">{props.ride?.captain?.vehicle.vehicleType}</p>
              <h1 className="text-xl font-semibold">{props.ride?.otp}</h1>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 -mt-8">
            <div className="w-full mt-5">
              <div className="flex items-center gap-3 p-3 border-b-2">
                <FaMapMarkerAlt className="text-gray-900 text-lg" />
                <div className="w-full">
                  <h3 className="font-semibold text-base">PICKUP</h3>
                  <p className="font-normal text-gray-600">
                  {props.ride?.pickup}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border-b-2">
                <FaLocationPinLock className="text-gray-900 text-lg" />
                <div className="w-full">
                  <h3 className="font-semibold text-base">DESTINATION</h3>
                  <p className="font-normal text-gray-600">
                  {props.ride?.destination}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3">
                <MdOutlinePayment className="text-gray-900 text-lg" />
                <div className="w-full">
                  <h3 className="font-semibold text-lg">₹{props.ride?.fare}</h3>
                  <p className="font-normal text-gray-600">Cash</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default WaitingForDriver
