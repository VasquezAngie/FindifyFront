import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/home/LandingPage";
import LandingPageProductos from "./pages/home/LandingPageProductos";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/productos" element={<LandingPageProductos />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
