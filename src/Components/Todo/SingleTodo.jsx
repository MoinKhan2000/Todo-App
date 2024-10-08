import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTodo } from '../../Context/todoContext';
import EditTodoModal from './EditTodoModal';
import { toast } from 'react-toastify';

const SingleTodo = ({ todo, fetchAllTodos }) => {
  const { deleteTodo, toggleTodo } = useTodo();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleStatus = async (status) => {
    console.log(todo._id);
    if (todo.status === status) {
      toast.error(`todo is already ${status}`,);
      return
    }
    try {
      const result = await toggleTodo(todo._id, status);
      if (result.success) {
        toast.success('Todo status toggled successfully');
        fetchAllTodos();
      } else {
        toast.error(result.message || 'Failed to update todo status');
      }
    } catch (error) {
      toast.error('An error occurred: ' + error.message);
    }
  };

  const deleteTheTodo = async () => {
    try {

      const result = await deleteTodo(todo._id);

      if (result.success) {
        toast.success('Todo deleted successfully');
        fetchAllTodos();
      } else {
        toast.error(result.message || 'Failed to delete todo');
      }
    } catch (error) {
      toast.error('An error occurred: ' + error.message);
    }
  };

  const openEditModal = () => {
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="p-8 rounded-lg flex flex-col justify-between items-center text-center space-y-8 bg-white text-black transition duration-300 ease-in-out shadow-2xl cursor-pointer"
      >
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">{todo.title}</h2>
          <p className="text-sm">{todo.desc}</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <button
            onClick={openEditModal}
            className="p-3 rounded-xl bg-white text-gray-800 hover:bg-gray-200 transition duration-300 flex items-center space-x-2"
            title="Edit"
          >
            <FaEdit />
            <span className="ml-2">Update</span>
          </button>
          <button
            onClick={deleteTheTodo}
            className="p-3 rounded-xl bg-white text-gray-800 hover:bg-gray-200 transition duration-300 flex items-center space-x-2"
            title="Delete"
          >
            <FaTrash />
            <span className="ml-2">Delete</span>
          </button>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button
            onClick={() => toggleStatus('pending')}
            className={`p-3 rounded-xl text-white transition duration-300 flex items-center space-x-2 ${todo.status === 'pending' ? 'bg-red-500' : 'bg-gray-400'}`}
            title="Mark as Pending"
          >
            <FaTimes />
            <span className="ml-2">Pending</span>
          </button>
          <button
            onClick={() => toggleStatus('complete')}
            className={`p-3 rounded-xl text-white transition duration-300 flex items-center space-x-2 ${todo.status === 'complete' ? 'bg-green-500' : 'bg-gray-400'}`}
            title="Mark as Completed"
          >
            <FaCheck />
            <span className="ml-2">Complete</span>
          </button>
        </div>
      </motion.div>

      <EditTodoModal
        isOpen={isModalOpen}
        onClose={closeEditModal}
        todo={todo}
        fetchAllTodos={fetchAllTodos}
      />
    </>
  );
};

export default SingleTodo;
