import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar, SignUp, AboutUs, Home, Login, Footer } from '../src/Components'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
