import React, { useState } from "react";
import logo from "../assets/uber_cab_logo.png";
import { Link } from "react-router-dom";

const CaptainSignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captainData, setCaptainData] = useState([]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setCaptainData({
        fullName: {
          firstName: firstName,
          lastName: lastName,
        },
        email: email,
        password: password,
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    };
  return (
    <div className="p-6 flex flex-col justify-between h-screen">
      {/* login User page */}
      <div>
        <img src={logo} className="w-20 mb-6" alt="" />
        <form onSubmit={handleSubmit}>
          <h3 className="text-base font-medium mb-2">What's our Captain's name?</h3>
          <div className="flex gap-4 mb-5">
            <input
              required
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="first name"
              className="bg-[#eeeeee] rounded-xl px-4 py-2 border w-1/2 text-base placeholder:text-sm"
            />
            <input
              required
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="last name"
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
            className="bg-[#eeeeee] rounded-xl px-4 py-2 mb-5 border w-full text-base placeholder:text-sm"
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="bg-[#eeeeee] rounded-xl px-4 py-2 mb-7 border w-full text-base placeholder:text-sm"
          />

          <button className="bg-[#111] text-white font-semibold rounded-xl px-4 py-2 mb-3 w-full text-lg">
            Create Account
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
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  )
}

export default CaptainSignUp
