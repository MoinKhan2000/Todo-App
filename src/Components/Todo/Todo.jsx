import React, { useEffect, useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SingleTodo from './SingleTodo';
import { useNavigate } from 'react-router';
import { useTodo } from '../../Context/todoContext';
import { toast, ToastContainer } from 'react-toastify';
import { useUser } from '../../Context/userContext';

const Todo = () => {
  const { fetchAllTodos, addTodo } = useTodo();
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', desc: '', status: 'pending' });
  const { logOutUser } = useUser();

  // Fetch Todos
  const fetchTodos = async () => {
    try {
      const result = await fetchAllTodos();
      if (result.success) {
        setTodos(result.data);
      } else {
        toast.error(result.message || 'Failed to fetch todos.');
      }
    } catch (error) {
      toast.error('An error occurred while fetching todos: ' + error.message);
    }
  };

  // Validate user authentication
  useEffect(() => {
    const token = localStorage.token;
    if (!token) navigate('/');
  }, [navigate, logOutUser]);

  // Fetch todos when component mounts
  useEffect(() => {
    fetchTodos();
  }, [fetchAllTodos, logOutUser]);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addTodo(formData);
      if (result.success) {
        toast.success('Todo added successfully!');
        fetchTodos(); // Refresh the todo list
        setShowModal(false);
      } else {
        toast.error(result.message || 'Failed to add todo.');
      }
    } catch (error) {
      toast.error('An error occurred: ' + error.message);
    }
    setFormData({ title: '', desc: '', status: 'pending' });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-start">
      <div className='flex justify-between items-center w-full max-w-4xl mx-auto my-4'>
        <h1 className="text-3xl font-bold">All Todos</h1>
        <motion.button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <FaPlus className="mr-2" /> Add Todo
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-6xl mx-auto">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <SingleTodo
              key={todo._id}
              todo={todo}
              fetchAllTodos={fetchTodos}
            />
          ))
        ) : (
          <div className="col-span-full text-center p-8">
            <p className="text-lg font-semibold text-gray-700">
              You have no todos. Add one from the button above.
            </p>
          </div>
        )}
      </div>

      {/* Modal for Adding Todo */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 p-2 rounded-full text-gray-500 hover:text-gray-700 transition"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Add Todo</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="desc" className="block text-gray-700 font-semibold mb-2">
                  Description
                </label>
                <textarea
                  id="desc"
                  name="desc"
                  value={formData.desc}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700 font-semibold mb-2">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
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
                  Save
                </span>
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Todo;
