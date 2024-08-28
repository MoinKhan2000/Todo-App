import React from 'react';
import { FaCheckCircle, FaClipboardList, FaCalendarCheck, FaUserShield } from 'react-icons/fa';
import { FiCheckSquare, FiLayers, FiTrendingUp } from 'react-icons/fi';

export function Home() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full lg:h-screen bg-gray-100 p-6 relative">

      {/* Left Section: Heading and Description */}
      <div className="w-full lg:w-1/2 p-8 space-y-6">
        {/* <h1 className="text-4xl font-bold text-gray-800 text-left">Welcome to the Ultimate ToDoApp</h1> */}
        <h1 className="lg:text-5xl text-4xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-600 drop-shadow-lg lg:text-left text-justify ">
          Your Journey to Organized Success Begins Here!
        </h1>

        <p className="text-lg text-gray-600 text-justify">
          Manage your tasks efficiently and boost your productivity with ToDoApp.
          Organize your day, week, or even month with our simple yet powerful tools.
        </p>

        <div className="space-y-4 text-center">
          <div className='flex flex-row space-y-4 lg:flex-col flex-wrap justify-between items-end lg:items-start '>
            <div className="flex items-center  space-x-4">
              <FaCheckCircle className="text-green-500 w-8 h-8" />
              <span className="text-lg font-semibold text-gray-700">
                Task Management
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <FaClipboardList className="text-blue-500 w-8 h-8" />
              <span className="text-lg font-semibold text-gray-700">
                Daily Planning
              </span>
            </div>
          </div>
          <div className='flex flex-row space-y-4 lg:flex-col flex-wrap  justify-between '>
            <div className="flex items-center space-x-4">
              <FaCalendarCheck className="text-purple-500 w-8 h-8" />
              <span className="text-lg font-semibold text-gray-700">
                Stay Updated
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <FaUserShield className="text-red-500 w-8 h-8" />
              <span className="text-lg font-semibold text-gray-700">
                Privacy First
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 p-8 grid grid-cols-3 gap-6">
        <div className="transform hover:scale-105 hover:rotate-3 transition-transform duration-500 shadow-lg bg-white p-3 lg:p-6 rounded-lg flex justify-center">
          <FiCheckSquare className="text-blue-500 w-12 h-12" />
        </div>
        <div className="transform hover:scale-105 hover:rotate-3 transition-transform duration-500 shadow-lg bg-white p-3 lg:p-6 rounded-lg flex justify-center">
          <FiLayers className="text-purple-500 w-12 h-12" />
        </div>
        <div className="transform hover:scale-105 hover:rotate-3 transition-transform duration-500 shadow-lg bg-white p-3 lg:p-6 rounded-lg flex justify-center">
          <FiTrendingUp className="text-green-500 w-12 h-12" />
        </div>
        <div className="transform hover:scale-105 hover:-rotate-3 transition-transform duration-500 shadow-lg bg-white p-3 lg:p-6 rounded-lg flex justify-center">
          <FaClipboardList className="text-red-500 w-12 h-12" />
        </div>
        <div className="transform hover:scale-105 hover:-rotate-3 transition-transform duration-500 shadow-lg bg-white p-3 lg:p-6 rounded-lg flex justify-center">
          <FaCheckCircle className="text-yellow-500 w-12 h-12" />
        </div>
        <div className="transform hover:scale-105 hover:-rotate-3 transition-transform duration-500 shadow-lg bg-white p-3 lg:p-6 rounded-lg flex justify-center">
          <FaCalendarCheck className="text-blue-500 w-12 h-12" />
        </div>
      </div>
    </div>
  );
}

export default Home;
