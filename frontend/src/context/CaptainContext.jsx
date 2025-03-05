import { createContext, useState } from "react";

export const CaptainDataContext = createContext();

const CaptainContext = (
    {children}
) => {
    const [captain, setCaptain] = useState({
        email:'',
        fullName: {
            firstName: '',
            lastName: ''
        },
        vehicle: {
            color: '',
            plate: '',
            capacity: '',
            vehicleType: ''
        }
    });  
  return (
    <div>
      <div>
      <CaptainDataContext.Provider value={{ captain , setCaptain}}>{children}</CaptainDataContext.Provider>
    </div>
    </div>
  )
}

export default CaptainContext
