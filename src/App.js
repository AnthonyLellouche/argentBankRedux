import React from "react";
import "./styles/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./base/Footer";
import Header from "./base/Header";

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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
