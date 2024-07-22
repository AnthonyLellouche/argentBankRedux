import React from "react";
import "./styles/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./base/Footer";
import Header from "./base/Header";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profil from "./pages/Profil";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <Counter />
    //   </header>
    // </div>
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
