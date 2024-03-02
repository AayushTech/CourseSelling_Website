import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function SignUp() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:3000/admin/signup", {
        username: email,
        password: password,
      });
      console.log("signup successfull", response.data);
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center items vertically
          justifyContent: "center", // Center items horizontally
          height: "80vh", // Set to full viewport height
        }}
      >
        <Typography variant="h5">Welcome To CodeFunDo SignUp</Typography>
        <Card varian="outlined" style={{ padding: 30, width: 350, margin: 10 }}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            fullWidth={true}
            id="outlined-basic"
            label="UserId"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            fullWidth={true}
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
          />
          <br />
          <br />
          <Button variant="contained" size="large" onClick={handleSignUp}>
            SignUp
          </Button>
        </Card>
      </div>
    </>
  );
}

export default SignUp;
