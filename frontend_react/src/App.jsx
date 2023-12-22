import { useState } from "react";
import Card from "@mui/material/Card";
import SignUp from "./SignUp";
import AppBar from "./AppBar";
import "./index.css";
import SignIn from "./SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#eeeeee",
        }}
      >
        <Router>
          <AppBar></AppBar>

          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
