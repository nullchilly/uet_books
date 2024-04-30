import React from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

function AuthScreen() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "user") {
      navigate("/user/home");
    } else if (role === "admin") {
      navigate("/admin/home");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <Box>
      <CircularProgress />
    </Box>
  );
}

export default AuthScreen;
