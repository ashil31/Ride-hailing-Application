import { FaMapMarkerAlt } from "react-icons/fa";

const LocationSearchPanel = (props) => {

    const locations = [
        "A/3, Hello this is an amazing place, Please must visit",
        "B/4, Hello this is an amazing place, Please must visit",
        "C/5, Hello this is an amazing place, Please must visit",
        "D/6, Hello this is an amazing place, Please must visit",
    ]

  return (
    <div>
      {/* this is justr a sample data */}
      {
        locations.map((location, index) => (
            <div onClick={()=> {
                props.setVehiclePanel(true);
                props.setPanel(false);
            }} key={index} className='flex items-center justify-start gap-3 border-2 border-gray-50 active:border-black p-3 rounded-xl my-2'>
                <div className='bg-[#eee] h-[2.3rem] w-[3.2rem] rounded-full flex items-center justify-center'><FaMapMarkerAlt className= "text-gray-900 text-xl" /></div>
                <div className='font-medium'><h4>{location}</h4></div>
            </div>
        )
        )
      }
    </div>
  )
}

export default LocationSearchPanel
