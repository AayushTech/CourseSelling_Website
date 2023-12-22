import { useState } from "react";
import Card from "@mui/material/Card";
import SignUp from "./SignUp";
import AppBar from "./AppBar";
import "./index.css";

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
        <AppBar></AppBar>
        <SignUp></SignUp>
      </div>
    </>
  );
}

export default App;
