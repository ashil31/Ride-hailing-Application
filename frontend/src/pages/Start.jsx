import React from "react";
import bg from "../assets/bg_home.jpg";
import logo from "../assets/uber_logo.png";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion';
const Start = () => {
  return (
    <div>
      <div className="h-screen w-full relative">
        <img
          src={bg}
          className="absolute top-0 left-0 w-full h-full object-cover"
          alt="Background"
        />
        <div className="relative z-10 h-screen w-full flex flex-col justify-between pt-5">
          <motion.img
            src={logo}
            className="w-20 ml-6 -mt-4"
            alt=""
            initial={{ y: -70, opacity: 0 }} // Start from below
            animate={{ y: 0, opacity: 1 }} // Move up to the top
            transition={{ duration: 1, ease: "easeOut" }} // Smooth animation
          />
          <motion.div 
            className="bg-white py-4 px-4" 
            initial={{ y: 70, opacity: 0 }} // Start from below
            animate={{ y: 0, opacity: 1 }} // Move up to the top
            transition={{ duration: 1, ease: "easeOut" }} // Smooth animation
          >
            <h2 className="text-3xl font-bold">Get Started with Uber</h2>
            <Link to="/login" className="flex items-center justify-center w-full bg-black text-white py-3 rounded-xl mt-4">
              Continue
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Start
