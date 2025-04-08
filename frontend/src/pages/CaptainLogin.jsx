import React, { useContext, useState } from "react";
import logo from "../assets/uber_cab_logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password
    };
  
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData);

    if (response.status === 200 || response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);    

      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-6 flex flex-col justify-between h-screen">
      {/* login User page */}
      <div>
        <img src={logo} className="w-20 mb-6" alt="" />
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            autoComplete="email"
            className="bg-[#eeeeee] rounded-xl px-4 py-2 mb-7 border w-full text-lg placeholder:text-base"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            className="bg-[#eeeeee] rounded-xl px-4 py-2 mb-7 border w-full text-lg placeholder:text-base"
          />

          <button className="bg-[#111] text-white font-semibold rounded-xl px-4 py-2 mb-3 w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          Join the Uber's fleet?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Register as a Captain
          </Link>{" "}
        </p>
      </div>
      {/* login Captain button */}
      <div className="pt-4">
        <Link
          to="/login"
          className="flex items-center justify-center bg-[#3beb53] text-black font-semibold rounded-xl px-4 py-2 mb-7 w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
