import { BsChevronCompactDown } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaLocationPinLock } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import car from "../assets/Uber_car.png";

const WaitingForDriver = () => {
  return (
    <div>
          <div
            onClick={() => props.setWaitingForDriver(false)}
            className="flex justify-center items-center text-3xl"
          >
            {" "}
            <BsChevronCompactDown className="w-full" />{" "}
          </div>
          <div className="flex items-center justify-between">
            <img src={car} className="h-20" alt="" />
            <div className="text-right">
              <h2 className="text-lg font-medium">Ashil</h2>
              <h4 className="text-xl font-semibold -mt-1 -mb-1">AP31 VG2108</h4>
              <p className="text-sm text-gray-600">BMW M4</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3">
            <div className="w-full mt-5">
              <div className="flex items-center gap-3 p-3 border-b-2">
                <FaMapMarkerAlt className="text-gray-900 text-lg" />
                <div className="w-full">
                  <h3 className="font-semibold text-lg">123/11-A</h3>
                  <p className="font-normal text-gray-600">
                    Mountain View, San jose, California
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border-b-2">
                <FaLocationPinLock className="text-gray-900 text-lg" />
                <div className="w-full">
                  <h3 className="font-semibold text-lg">Starbucks</h3>
                  <p className="font-normal text-gray-600">
                    Los Angeles, California
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3">
                <MdOutlinePayment className="text-gray-900 text-lg" />
                <div className="w-full">
                  <h3 className="font-semibold text-lg">₹193.20</h3>
                  <p className="font-normal text-gray-600">Cash</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default WaitingForDriver
