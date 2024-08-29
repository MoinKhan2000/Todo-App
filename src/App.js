import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar, SignUp, AboutUs, Home, Login, Footer, Logout } from '../src/Components'
import Todo from './Components/Todo/Todo';
import { TodoProvider } from './Context/todoContext';
import { UserProvider } from './Context/userContext';

function App() {
  return (
    <UserProvider>
      <TodoProvider>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/todos" element={<Todo />} />
              <Route path="/logout" element={<Logout />} />

            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </TodoProvider>
    </UserProvider>
  );
}

export default App;
