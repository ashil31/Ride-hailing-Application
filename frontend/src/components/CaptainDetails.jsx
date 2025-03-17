import profile from "../assets/profile.png";
import { MdAccessTimeFilled } from "react-icons/md";
import { IoSpeedometer } from "react-icons/io5";
import { BiSolidNotepad } from "react-icons/bi";

const CaptainDetails = () => {
  return (
    <div>
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <img
            src={profile}
            className="h-11 w-11 rounded-full object-cover"
            alt=""
          />
          <h4 className="font-medium text-lg">Ashil Patel</h4>
        </div>
        <div className="text-right">
          <h4 className="font-semibold text-xl">₹295.20</h4>
          <p className="font-normal text-gray-500">Earned</p>
        </div>
      </div>
      <div className="flex items-start justify-center gap-2 bg-yellow-500 shadow-lg h-[140px] rounded-xl p-3 pt-5 ">
        <div className="text-center flex flex-col items-center w-1/3 ">
          <MdAccessTimeFilled className="text-3xl mb-3" />
          <h4 className="text-xl font-semibold pb-2">10.2</h4>
          <p className="text-xs text-[#2f2e2e9c]">HOURS ONLINE</p>
        </div>
        <div className="text-center flex flex-col items-center w-1/3 ">
          <IoSpeedometer className="text-3xl mb-3" />
          <h4 className="text-xl font-semibold pb-2">30 KM</h4>
          <p className="text-xs text-[#2f2e2e9c]">TOTAL DISTANCE</p>
        </div>
        <div className="text-center flex flex-col items-center w-1/3 ">
          <BiSolidNotepad className="text-3xl mb-3" />
          <h4 className="text-xl font-semibold pb-2">20</h4>
          <p className="text-xs text-[#2f2e2e9c]">TOTAL JOBS</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
