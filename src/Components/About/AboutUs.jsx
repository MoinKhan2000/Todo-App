import React from 'react';
import { FaLock, FaUserShield, FaTasks } from 'react-icons/fa';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import bg from "../../../src/bg.png";

const AboutUs = () => {
  return (
    <div className="relative py-16 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-white/50 to-gray-300 opacity-50 blur-sm"></div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Introduction Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left mb-12">
          <div className="md:w-1/2">
            <h1 className="lg:text-5xl text-4xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-600 drop-shadow-lg lg:text-left text-justify ">
              About ToDoApp
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              ToDoApp provides you with a reliable and secure task management experience. Our platform ensures your tasks are organized and managed efficiently, with top-notch authenticity, privacy, and CRUD functionalities.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
            <img
              src={bg}
              alt="ToDoApp Illustration"
              className="w-full max-w-md rounded-lg shadow-2xl transition-transform duration-300 transform hover:scale-105"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="flex flex-wrap gap-8 mb-12">
          <div className="flex-1 min-w-[250px] bg-white p-6 rounded-lg shadow-xl transition-transform duration-300 transform hover:scale-105 glass-effect">
            <FaUserShield className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Authenticity</h3>
            <p className="text-gray-600">
              Ensure your tasks are managed with genuine data and secure processes that maintain the integrity of your task management experience.
            </p>
          </div>
          <div className="flex-1 min-w-[250px] bg-white p-6 rounded-lg shadow-xl transition-transform duration-300 transform hover:scale-105 glass-effect">
            <FaLock className="text-4xl text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Privacy</h3>
            <p className="text-gray-600">
              Your privacy is our top priority. We use advanced security measures to ensure your personal and task-related information is protected.
            </p>
          </div>
          <div className="flex-1 min-w-[250px] bg-white p-6 rounded-lg shadow-xl transition-transform duration-300 transform hover:scale-105 glass-effect">
            <FaTasks className="text-4xl text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">CRUD Operations</h3>
            <p className="text-gray-600">
              Efficiently Create, Read, Update, and Delete your tasks with a user-friendly interface designed to enhance productivity.
            </p>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Key Features
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex-1 min-w-[250px] bg-white p-6 rounded-lg shadow-xl transition-transform duration-300 transform hover:scale-105 glass-effect flex items-center space-x-4">
              <AiOutlineCheckCircle className="text-3xl text-purple-500" />
              <p className="text-gray-600">
                <strong>Easy Task Management:</strong> Manage your tasks efficiently with an intuitive interface and seamless operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
