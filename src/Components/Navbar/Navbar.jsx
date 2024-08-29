import React, { useState } from 'react';
import { FiMenu, FiX, FiLogIn, FiUserPlus, FiHome, FiInfo } from 'react-icons/fi';
import { LuListTodo, LuLogOut } from 'react-icons/lu';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../Context/userContext';

const menuItems = [
  {
    name: 'Home',
    href: '/',
    icon: <FiHome size={20} />,
  },
  {
    name: 'About',
    href: '/about',
    icon: <FiInfo size={20} />,
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, logOutUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logOutUser();
    navigate('/');
  };

  return (
    <div className="w-full bg-gray-100 shadow-lg sticky top-0 z-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="inline-flex items-center space-x-2">
          <LuListTodo size={30} className="text-black" />
          <NavLink to="/" className="font-bold text-lg text-gray-800">ToDoApp</NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-4">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name} className="group flex items-center space-x-2">
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `relative text-sm font-bold py-3 px-5 rounded-md flex items-center transition-all duration-300 ease-in-out ${isActive ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} hover:bg-blue-600 hover:text-white`
                  }
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                  <span className="absolute inset-0 -z-10 transition-transform duration-300 ease-in-out bg-white bg-opacity-20 blur-md rounded-lg scale-0 group-hover:scale-100"></span>
                </NavLink>
              </li>
            ))}
            {token && (
              <li className="group flex items-center space-x-2">
                <NavLink
                  to='/todos'
                  className={({ isActive }) =>
                    `relative text-sm font-bold py-3 px-5 rounded-md flex items-center transition-all duration-300 ease-in-out ${isActive ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} hover:bg-blue-600 hover:text-white`
                  }
                >
                  <LuListTodo size={20} />
                  <span className="ml-2">Your Todos</span>
                  <span className="absolute inset-0 -z-10 transition-transform duration-300 ease-in-out bg-white bg-opacity-20 blur-md rounded-lg scale-0 group-hover:scale-100"></span>
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {!token ? (
            <>
              <NavLink
                to="/login"
                className="relative rounded-md px-5 font-bold py-3 text-sm text-black border-transparent transition duration-300 ease-in-out overflow-hidden group bg-white hover-border-transparent"
              >
                <span
                  className="absolute inset-0 bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-600 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100 rounded-lg hover:text-white"
                  style={{ transformOrigin: 'left' }}
                ></span>
                <span className="text text-transparent font-bold bg-clip-text bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-600 drop-shadow-lg lg:text-left text-justify hover:text-white group-hover:text-white flex flex-row-reverse gap-2">
                  <span>Login</span>
                  <FiLogIn size={20} className="text-black group-hover:text-white" />
                </span>
              </NavLink>

              <NavLink
                to="/signup"
                className="relative rounded-md px-5 font-bold py-3 text-sm text-black border-transparent transition duration-300 ease-in-out overflow-hidden group bg-white hover-border-transparent"
              >
                <span
                  className="absolute inset-0 bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-600 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100 rounded-lg hover:text-white"
                  style={{ transformOrigin: 'right' }}
                ></span>
                <span className="text text-transparent font-bold bg-clip-text bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-600 drop-shadow-lg lg:text-left text-justify hover:text-white group-hover:text-white flex flex-row-reverse gap-2">
                  <span>Sign Up</span>
                  <FiUserPlus size={20} className="text-black group-hover:text-white" />
                </span>
              </NavLink>
            </>
          ) : (
            <button
              className="relative rounded-md px-5 font-bold py-3 text-sm text-black border-transparent transition duration-300 ease-in-out overflow-hidden group bg-white hover-border-transparent"
              onClick={handleLogout}
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-600 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100 rounded-lg hover:text-white"
                style={{ transformOrigin: 'right' }}
              ></span>
              <span className="text text-transparent font-bold bg-clip-text bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-600 drop-shadow-lg lg:text-left text-justify hover:text-white group-hover:text-white flex flex-row-reverse gap-2">
                <span>Log Out</span>
                <LuLogOut size={20} className="text-black group-hover:text-white" />
              </span>
            </button>
          )}
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
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          `relative flex items-center space-x-2 text-base font-semibold transition duration-300 ease-in-out ${isActive ? 'bg-blue-500 text-white' : 'text-gray-800'} hover:bg-blue-600 hover:text-white`
                        }
                      >
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                        <span className="absolute inset-0 -z-10 transition-transform duration-300 ease-in-out bg-white bg-opacity-20 blur-md rounded-lg scale-0 hover:scale-100"></span>
                      </NavLink>
                    ))}
                    {token && (
                      <NavLink
                        to='/todos'
                        className={({ isActive }) =>
                          `relative flex items-center space-x-2 text-base font-semibold transition duration-300 ease-in-out ${isActive ? 'bg-blue-500 text-white' : 'text-gray-800'} hover:bg-blue-600 hover:text-white`
                        }
                      >
                        <LuListTodo size={20} />
                        <span className="ml-2">Your Todos</span>
                        <span className="absolute inset-0 -z-10 transition-transform duration-300 ease-in-out bg-white bg-opacity-20 blur-md rounded-lg scale-0 hover:scale-100"></span>
                      </NavLink>
                    )}
                  </nav>
                </div>
              </div>
              <div className="px-5 py-6 space-y-4">
                {!token ? (
                  <>
                    <NavLink
                      to="/login"
                      className="block w-full rounded-md bg-gray-700 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-gray-800 transition duration-300 ease-in-out"
                    >
                      <div className='flex justify-center space-x-4'>
                        <FiLogIn size={20} />
                        <span>Login</span>
                      </div>
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className="block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700 transition duration-300 ease-in-out"
                    >
                      <div className='flex justify-center space-x-4'>
                        <FiUserPlus size={20} />
                        <span>Sign Up</span>
                      </div>
                    </NavLink>
                  </>
                ) : (
                  <button
                    className="block w-full rounded-md bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-gradient-to-br transition duration-300 ease-in-out"
                    onClick={handleLogout}
                  >
                    <div className='flex justify-center'>
                      <LuLogOut size={20} />
                      <span>Logout</span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
