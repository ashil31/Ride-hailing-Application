import React, { useContext, useState } from "react";
import logo from "../assets/uber_logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState([]);

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    };
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

    if (response.status === 200 || response.status === 201) {
      const data = response.data;
      setUser(data.user);           
      localStorage.setItem('token', data.token);    
      navigate('/home');
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
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create new Account
          </Link>{" "}
        </p>
      </div>
      {/* login Captain button */}
      <div className="pt-4">
        <Link
          to="/captain-login"
          className="flex items-center justify-center bg-[#eaea41] text-black font-semibold rounded-xl px-4 py-2 mb-7 w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
