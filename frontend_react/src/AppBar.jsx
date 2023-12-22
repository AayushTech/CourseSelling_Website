import { Button, Typography } from "@mui/material";

function AppBar() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Typography>CodeFunDo</Typography>
        </div>
        <div>
          <Button variant="contained">Signup</Button>
          <Button variant="contained">Login</Button>
        </div>
      </div>
    </>
  );
}

export default AppBar;
