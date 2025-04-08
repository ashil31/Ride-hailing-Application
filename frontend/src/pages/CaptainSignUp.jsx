import React, { useContext, useState } from "react";
import logo from "../assets/uber_cab_logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [vehicleColor, setVehicleColor] = useState("");
    const [vehiclePlate, setVehiclePlate] = useState("");
    const [vehicleCapacity, setVehicleCapacity] = useState("");
    const [vehicleType, setVehicleType] = useState("");


    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const newCaptain = {
        fullName: {
          firstName: firstName,
          lastName: lastName,
        },
        email: email,
        password: password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType: vehicleType,
        },
      };

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain);

      if(response.status === 200 || response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
      }
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setVehicleColor("");
      setVehiclePlate("");
      setVehicleCapacity("");
      setVehicleType("");
    };
  return (
    <div className="p-6 flex flex-col justify-between h-screen">
      {/* login User page */}
      <div>
        <img src={logo} className="w-20 mb-3" alt="" />
        <form onSubmit={handleSubmit} className="p-2">
          <h3 className="text-base font-medium mb-2">What's our Captain's name?</h3>
          <div className="flex gap-4 mb-3">
            <input
              required
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="first name"
              autoComplete="first-name"
              className="bg-[#eeeeee] rounded-xl px-4 py-2 border w-1/2 text-sm placeholder:text-sm"
            />
            <input
              required
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="last name"
              autoComplete="last-name"
              className="bg-[#eeeeee] rounded-xl px-4 py-2 border w-1/2 text-base placeholder:text-sm"
            />
          </div>
          <h3 className="text-base font-medium mb-2">What's our Captain's email?</h3>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            autoComplete="email"
            className="bg-[#eeeeee] rounded-xl px-4 py-2 mb-3 border w-full text-base placeholder:text-sm"
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            className="bg-[#eeeeee] rounded-xl px-4 py-2 mb-3 border w-full text-base placeholder:text-sm"
          />

          <h3 className="text-base font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-4 mb-3">
            <input
              required
              type="text"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              placeholder="Vehicle Color"
              autoComplete="vehicle-color"
              className="bg-[#eeeeee] rounded-xl px-4 py-2 border w-1/2 text-sm placeholder:text-xs"
            />
            <input
              required
              type="text"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              placeholder="Vehicle Plate"
              autoComplete="vehicle-plate"
              className="bg-[#eeeeee] rounded-xl px-4 py-2 border w-1/2 text-sm placeholder:text-xs"
            />
          </div>
          <div className="flex gap-4 mb-6">
            <input
              required
              type="number"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              placeholder="Vehicle Capacity"
              autoComplete="vehicle-capacity"
              className="bg-[#eeeeee] rounded-xl px-4 py-2 border w-1/2 text-sm placeholder:text-xs"
            />
            <select
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-[#eeeeee] rounded-xl px-4 py-2 border w-1/2 text-sm placeholder:text-xs"
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button className="bg-[#111] text-white font-semibold rounded-xl px-4 py-2 mb-3 w-full text-lg">
            Create Captain Account
          </button>
        </form>
        <p className="text-center">
          Already Registered?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Sign In
          </Link>{" "}
        </p>
      </div>
      {/* login Captain button */}
      {/* <div className="relative pt-10 text-[10px] leading-tight flex gap-2">
        <input type="checkbox" name="" id="" className="absolute top-0 left-0"/>
        <p className="absolute top-0 left-5">By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
      </div> */}
      <div className="p-2">
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  )
}

export default CaptainSignUp
