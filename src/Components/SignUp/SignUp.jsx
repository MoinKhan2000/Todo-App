import React, { useState } from 'react';
import SignUPImg from '../../../src/singup.jpg'

export function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        {/* Left Column: Form */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center lg:text-left">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-lg font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-lg font-semibold text-gray-700 mb-2">
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
              <label htmlFor="password" className="text-lg font-semibold text-gray-700 mb-2">
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

            <button
              type="submit"
              className="relative w-full py-3 bg-[#e4e7f2] text-black font-bold rounded-lg overflow-hidden transition duration-300 ease-in-out group outline-none"
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-600 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100 rounded-lg"
                style={{ transformOrigin: 'left' }}
              ></span>
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-600 group-hover:text-white">
                Sign Up
              </span>
            </button>
          </form>
        </div>

        {/* Right Column: Image */}
        <div className="hidden lg:flex justify-center items-center">
          <img
            src={SignUPImg}
            alt="Signing"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
