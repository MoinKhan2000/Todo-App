import React, { useState, useEffect } from 'react';
import { useTodo } from '../../Context/todoContext';
import { toast } from 'react-toastify';

const EditTodoModal = ({ isOpen, onClose, todo, fetchAllTodos }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const { updateTodo } = useTodo();

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDesc(todo.desc);
    }
  }, [todo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc) {
      toast.error('Title and description are required');
      return;
    }

    const result = await updateTodo(todo._id, { title, desc });
    if (result.success) {
      toast.success('Todo updated successfully');
      onClose();
      await fetchAllTodos()
    } else {
      toast.error(result.message || 'Failed to update todo');
    }
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-gray-800 opacity-50" onClick={onClose}></div>
        <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Edit Todo</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    ) : null
  );
};

export default EditTodoModal;
