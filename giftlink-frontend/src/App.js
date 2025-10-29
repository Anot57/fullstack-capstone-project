import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import MainPage from "./components/MainPage/MainPage";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/app" element={<MainPage />} />
        <Route
          path="/"
          element={
            <div className="text-center mt-5">
              <h2>Welcome to GiftLink 🎁</h2>
              <p>Click "Gifts" in the navbar to explore available gifts.</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

