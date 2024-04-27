import * as React from "react";

import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";
import background from "../../assets/img/background.svg";
import logo from "../../assets/img/logo.svg";
import { ChangeEvent, Component, useState } from "react";

const theme = createTheme();

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmError, setConfirmError] = useState("");

  const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setConfirmError("Passwords do not match.");
    } else {
      setConfirmError("");
      // Handle form submission logic here
    }
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/register", {
        username: userName,
        fullName: fullName,
        password: password,
        email: email,
      });
      console.log(email);
      setLoading(false);
      if (res.data.msg === "Register success") {
        console.log("Registration successful:", res.data.msg);
      } else {
        console.error("Registration failed:", res.data.msg);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100%",
          // justifyContent: 'center',
          // alignItems: 'center',
        }}
      >
        {
          <Grid container sx={{ height: "100%" }}>
            <Box
              sx={{
                backgroundColor: "white",
                margin: "auto",
                width: "25%",
                height: "88%",
                paddingX: 5,
                display: "flex",
                flexDirection: "column",

                // justifyContent: 'center',
                alignItems: "center",
                borderRadius: "12px",
              }}
            >
              <img
                src={logo}
                alt="My SVG Image"
                style={{ marginTop: "40px", height: "70px" }}
              />
              <Typography component="h1" variant="h5" mt={5}>
                Registration
              </Typography>
              <Typography
                component="h2"
                mt={1}
                sx={{
                  color: "#ABABAB",
                  fontSize: 15,
                  fontWeight: 400,
                  marginLeft: "13px",
                }}
              >
                For Students
              </Typography>

              <ValidatorForm
                noValidate
                style={{ width: "100%", marginTop: "12px" }}
                onSubmit={() => handleSubmit()}
              >
                <TextValidator
                  margin="dense"
                  required
                  fullWidth
                  id="email"
                  label="Full Name"
                  name="fullName"
                  autoComplete="fullName"
                  value={fullName}
                  onChange={handleFullNameChange}
                  validators={["required", "matchRegexp:^[a-zA-Z0-9 ]*$"]}
                  errorMessages={["Fullname is required.", "Invalid Fullname"]}
                  onFocus={() => setError("")}
                />
                <TextValidator
                  margin="dense"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={userName}
                  onChange={handleUsernameChange}
                  validators={["required", "matchRegexp:^[a-zA-Z0-9 ]*$"]}
                  errorMessages={["Username is required.", "Invalid Username"]}
                  onFocus={() => setError("")}
                />

                <TextValidator
                  margin="dense"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  validators={["required", "minStringLength:8"]}
                  errorMessages={[
                    "Password is required.",
                    "Password must be at least 8 characters long.",
                  ]}
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={() => setError("")}
                />

                <TextValidator
                  margin="normal"
                  type="password"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  validators={["required", "minStringLength:8"]}
                  errorMessages={[
                    "Confirm Password is required",
                    "Password must be at least 8 characters long.",
                  ]}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={confirmError !== ""}
                  helperText={confirmError}
                  onFocus={() => setError("")}
                />
                <TextValidator
                  margin="dense"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                  validators={["required", "isEmail"]}
                  errorMessages={["Email is required.", "Invalid Email"]}
                  onFocus={() => setError("")}
                />
                {/*  <Typography
                  component="h1"
                  variant="h5"
                  sx={{ color: "#d32f2f", fontSize: 13, marginLeft: "13px" }}
                >
                  {confirmError}
                </Typography> */}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    fontSize: 16,
                    backgroundColor: "#FA7C22",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#D54A1E",
                    },
                  }}
                  onClick={() => setError("")}
                >
                  Register
                </Button>
              </ValidatorForm>
              <span style={{ fontSize: 14 }}>
                Already a User?
                <a
                  href="/"
                  style={{
                    color: "#FA7C22",
                    marginLeft: 8,
                    textDecoration: "underline",
                  }}
                >
                  Login now
                </a>
              </span>

              {loading ? (
                <Box
                  sx={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <></>
              )}
            </Box>
          </Grid>
        }
      </Box>
    </ThemeProvider>
  );
}
