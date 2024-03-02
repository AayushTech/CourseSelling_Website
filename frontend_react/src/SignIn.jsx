import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function SignIn() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const handleSignin = async () => {
    try {
      let response = await axios.post("http://localhost:3000/admin/login", {
        username: email,
        password: password,
      });
      console.log("signin successfully", response.data);
    } catch (error) {
      console.error("Error", error);
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
        <Typography variant="h5">Welcome Back! SignIn Below</Typography>
        <Card varian="outlined" style={{ padding: 30, width: 350, margin: 10 }}>
          <TextField
            fullWidth={true}
            id="outlined-basic"
            label="UserId"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <TextField
            fullWidth={true}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <Button variant="contained" size="large" onClick={handleSignin}>
            Signin
          </Button>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
