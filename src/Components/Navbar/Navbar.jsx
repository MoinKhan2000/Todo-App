import React from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { LuListTodo } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const menuItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'About',
    href: '/about',
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full bg-gray-100 shadow-lg sticky top-0 z-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="inline-flex items-center space-x-2">
          <LuListTodo size={30} className="text-black" />
          <Link to="/" className="font-bold text-lg text-gray-800">ToDoApp</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name} className="group">
                <Link
                  to={item.href}
                  className="relative text-sm font-semibold text-gray-800 transition-all duration-300 ease-in-out p-2 border-x-2 border-transparent hover:border-2 hover:rounded-xl hover:bg-blue-500 hover:text-white hover:shadow-lg hover:scale-105 bg-white rounded-xl "
                >
                  {item.name}
                  <span className="absolute inset-0 -z-10 transition-transform duration-300 ease-in-out bg-white bg-opacity-20 blur-md rounded-lg scale-0 group-hover:scale-100"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:block space-x-4">
          {/* Login Button */}
          <Link
            to="/login"
            className="relative rounded-md px-3 py-2 text-sm  text-black  border-transparent transition duration-300 ease-in-out overflow-hidden group bg-white hover-border-transparent "
          >
            <span
              className="absolute inset-0 bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-600 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100 rounded-lg hover:text-white"
              style={{ transformOrigin: 'left' }}
            ></span>
            <span className=" text-transparent font-bold bg-clip-text bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-600 drop-shadow-lg lg:text-left text-justify hover:text-white group-hover:text-white">
              Login
            </span>
          </Link>

          {/* Sign Up Button */}
          <Link
            to="/signup"
            className="relative rounded-md px-3 py-2 text-sm  text-black  border-transparent transition duration-300 ease-in-out overflow-hidden group  bg-white hover-border-transparent  "
          >
            <span
              className="absolute inset-0 bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-600 transform scale-x-0 transition-transform duration-300  ease-in-out group-hover:scale-x-100 rounded-lg hover:text-white"
              style={{ transformOrigin: 'right' }}
            ></span>
            <span className="text text-transparent font-bold bg-clip-text bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-600 drop-shadow-lg lg:text-left text-justify hover:text-white group-hover:text-white">
              Sign Up</span>
          </Link>
        </div>


        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          {isMenuOpen ? (
            <FiX
              onClick={toggleMenu}
              className="h-6 w-6 cursor-pointer text-gray-800"
            />
          ) : (
            <FiMenu
              onClick={toggleMenu}
              className="h-6 w-6 cursor-pointer text-gray-800"
            />
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <LuListTodo size={30} className="text-black" />
                    <span className="font-bold text-lg text-gray-800">ToDoApp</span>
                  </div>
                  <FiX
                    onClick={toggleMenu}
                    className="h-6 w-6 cursor-pointer text-gray-800"
                  />
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="relative text-base font-semibold text-gray-800 hover:text-gray-900 transition duration-300 ease-in-out"
                      >
                        {item.name}
                        <span className="absolute inset-0 -z-10 transition-transform duration-300 ease-in-out bg-white bg-opacity-20 blur-md rounded-lg scale-0 hover:scale-100"></span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="px-5 py-6 space-y-4">
                <Link
                  to="/login"
                  className="block w-full rounded-md bg-gray-700 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-gray-800 transition duration-300 ease-in-out"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
