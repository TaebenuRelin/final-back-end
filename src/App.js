import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chatbot from "./components/Chatbot.jsx";
import About from "./components/About.jsx";
import Home from "./components/Home.jsx";

// Tambahkan komponen Footer
function Footer() {
  return (
    <div
      style={{
        backgroundColor: "#333",
        color: "#fff",
        textAlign: "center",
        padding: "10px",
      }}
    >
      <p>© 2024 Resep Masakan Manado. All rights reserved.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <div style={{ display: "flex", flex: 1 }}>
          <Sidebar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>

        {/* Tambahkan Footer di bawah */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
