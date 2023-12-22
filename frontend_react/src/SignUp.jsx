import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";

function SignUp() {
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
            fullWidth={true}
            id="outlined-basic"
            label="UserId"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            fullWidth={true}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <br />
          <br />
          <Button variant="contained" size="large">
            SignUp
          </Button>
        </Card>
      </div>
    </>
  );
}

export default SignUp;
