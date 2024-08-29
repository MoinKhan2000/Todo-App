import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useTodo } from '../../Context/todoContext';

const Logout = () => {
  const { logout } = useTodo()

  useEffect(() => {
    logout()
    console.log('logged out');

  }, [logout])
  return (
    <Navigate to="/"></Navigate>
  );
}

export default Logout;
