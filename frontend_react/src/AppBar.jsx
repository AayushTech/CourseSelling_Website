import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AppBar() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Typography>CodeFunDo</Typography>
        </div>
        <div>
          <Button
            variant="contained"
            style={{ marginRight: 10 }}
            onClick={() => navigate("/signup")}
          >
            Signup
          </Button>
          <Button variant="contained" onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
}

export default AppBar;
