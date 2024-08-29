import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginImg from '../../../src/login.jpg';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../Context/userContext';

export function Login() {
  const navigate = useNavigate();
  const { signIn } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await signIn(formData);
    if (result.success) {
      toast.success('Successfully logged in!');
      setTimeout(() => {
        navigate('/todos');
      }, 2000);
    } else {
      toast.error(result.message || 'Failed to log in. Please try again.');
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gray-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Column: Image */}
        <motion.div
          className="hidden md:flex justify-center items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={LoginImg}
            alt="Login Illustration"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Right Column: Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-lg font-semibold text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-lg font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="relative w-full py-3 bg-[#e4e7f2] text-black font-bold rounded-lg overflow-hidden transition duration-300 ease-in-out group"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-600 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100 rounded-lg"
                style={{ transformOrigin: 'left' }}
              ></span>
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-600 group-hover:text-white">
                Login
              </span>
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </motion.div>
  );
}

export default Login;
