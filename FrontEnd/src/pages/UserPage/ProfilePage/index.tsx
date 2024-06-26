import * as React from "react";
import { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import book from "../../../assets/img/book.svg";
import { ChangeEvent } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  TextField,
} from "@mui/material";
import avatar from "../../../assets/img/avatar.svg";
import axios from "axios";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ProfilePage() {
  const [value, setValue] = React.useState(0);
  const [username, setUsername] = React.useState("");

  const [fullName, setFullName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const Id = localStorage.getItem("id") || "";
  // const [id, setId] = React.useState("");
  // const id = localStorage.getItem("id");
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
 

  const getData = async (id: string) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/getUserByID/${id}`);

      /*  console.log(res.data);
      console.log(res.data.data.fullName);
      console.log(res.data.address); */
      /*  setFullName(res.data[0].fullName);
      setAddress(res.data.address);
      setPhone(res.data.phone);
      setEmail(res.data.email); */
      return res.data;
    } catch (err: any) {
      console.log("Get data failed: " + err.message);
    }
  };
  const fetchData = async () => {
    try {
      const res = await getData(Id);
      console.log(res);
      console.log(res.data);
      console.log(res.data[0]);
      console.log(res.data[0].fullName);
      setFullName(res.data[0].fullName);
      setAddress(res.data[0].address);
      setEmail(res.data[0].email);
      setBudget(res.data[0].budget);
      setUsername(res.data[0].username);
    } catch (err: any) {
      console.log("Fetch data failed: " + err.message);
    }
  };
  const handlePayment = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/user/rental/addBudget`,
        {
          userId: Id,
          amount: amount,
        }
      );
      window.location.reload();

      return res.data;
    } catch (err: any) {
      console.log("Payment failed: " + err.message);
    }
  };
  useEffect(() => {
    console.log("id: " + Id);
    fetchData();
  }, []);
  return (
    <>
      <Box
        id="style-2"
        sx={{
          backgroundColor: "#f3f3f7",
          width: "calc(100% - var(--default-layout-width-sidebar))",
          height: "calc(100vh - var(--default-layout-height-header))",
          float: "right",
          overflowY: "scroll",
        }}
      >
        <Box sx={{ backgroundColor: "white", margin: 4, borderRadius: 4 }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Account Setting"
                sx={{
                  ":focus": { color: "#f4683c" },
                  ":hover": { color: "#f4683c" },
                }}
                {...a11yProps(0)}
              />
              <Tab
                label="Payment"
                sx={{
                  ":focus": { color: "#f4683c" },
                  ":hover": { color: "#f4683c" },
                }}
                {...a11yProps(1)}
              />
              <Tab
                label="Notification"
                sx={{
                  ":focus": { color: "#f4683c" },
                  ":hover": { color: "#f4683c" },
                }}
                {...a11yProps(2)}
              />
              <Tab
                label="Interface"
                sx={{
                  ":focus": { color: "#f4683c" },
                  ":hover": { color: "#f4683c" },
                }}
                {...a11yProps(3)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p>Your Profile Picture</p>
                <img
                  src={avatar}
                  alt="Avatar"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: 50,
                    margin: 22,
                  }}
                />
              </div>
              <div>
                <Card
                  sx={{
                    minWidth: 190,
                    maxHeight: 190,
                    backgroundColor: "#F27851",
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      sx={{ height: 100, width: 110, margin: 2 }}
                      src={book}
                      alt="green iguana"
                    />
                    <CardContent
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        sx={{ color: "white", marginTop: -2 }}
                        component="div"
                      >
                        Readings
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        sx={{ color: "white", marginTop: -2 }}
                        component="div"
                      >
                        120
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </Box>
            <Box>
              <Grid container columns={16}>
                <Grid xs={8} sx={{ justifyContent: "center" }}>
                  <Typography
                    component="h1"
                    sx={{ fontSize: 16 }}
                    mt={3}
                    ml={2}
                  >
                    Full Name
                  </Typography>
                  <TextField
                    id="filled-multiline-static"
                    fullWidth
                    multiline
                    rows={1}
                    sx={{
                      margin: 2,
                      marginTop: 1,
                      width: "90%",
                      backgroundColor: "#F0F3F7",
                    }}
                    value={fullName}
                  />
                </Grid>
                <Grid xs={8} sx={{ justifyContent: "center" }}>
                  <Typography
                    component="h1"
                    sx={{ fontSize: 16 }}
                    mt={3}
                    ml={2}
                  >
                    Username
                  </Typography>
                  <TextField
                    id="filled-multiline-static"
                    fullWidth
                    multiline
                    rows={1}
                    sx={{
                      margin: 2,
                      marginTop: 1,
                      width: "90%",
                      backgroundColor: "#F0F3F7",
                    }}
                    value={username}
                  />
                </Grid>
                <Grid xs={8} sx={{ justifyContent: "center" }}>
                  <Typography
                    component="h1"
                    sx={{ fontSize: 16 }}
                    mt={3}
                    ml={2}
                  >
                    Email
                  </Typography>
                  <TextField
                    id="filled-multiline-static"
                    fullWidth
                    multiline
                    rows={1}
                    sx={{
                      margin: 2,
                      marginTop: 1,
                      width: "90%",
                      backgroundColor: "#F0F3F7",
                    }}
                    value={email}
                  />
                </Grid>
                <Grid xs={8} sx={{ justifyContent: "center" }}>
                  <Typography
                    component="h1"
                    sx={{ fontSize: 16 }}
                    mt={3}
                    ml={2}
                  >
                    Address
                  </Typography>
                  <TextField
                    id="filled-multiline-static"
                    fullWidth
                    multiline
                    rows={1}
                    sx={{
                      margin: 2,
                      marginTop: 1,
                      width: "90%",
                      backgroundColor: "#F0F3F7",
                    }}
                    value={address}
                  />
                </Grid>

                <Grid xs={16} sx={{ justifyContent: "center" }}>
                  <Typography
                    component="h1"
                    sx={{ fontSize: 16 }}
                    mt={2}
                    ml={2}
                  >
                    Money
                  </Typography>
                  <TextField
                    id="filled-multiline-static"
                    fullWidth
                    multiline
                    rows={1}
                    sx={{
                      margin: 2,
                      marginTop: 1,
                      width: "95%",
                      backgroundColor: "#F0F3F7",
                    }}
                    value={budget}
                  />
                </Grid>
              </Grid>
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                ml: 2,
                fontSize: 16,
                backgroundColor: "#FA7C22",
                color: "white",
                "&:hover": {
                  backgroundColor: "#D54A1E",
                },
              }}
              onClick={() => {}}
            >
              Update Profile
            </Button>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ValidatorForm onSubmit={handlePayment}>
              <TextValidator
                sx={{ marginTop: "10px" }}
                fullWidth
                value={fullName}
                label="Full Name"
                name="fullName"
                variant="standard"
                color="secondary"
                validators={["required"]}
              />
              <TextValidator
                sx={{ marginTop: "10px" }}
                fullWidth
                value={amount}
                label="Amount"
                name="amount"
                variant="standard"
                color="secondary"
                validators={["required"]}
                errorMessages={["Vui lòng nhập số tiền"]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAmount(e.target.value)
                }
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  ml: 2,
                  fontSize: 16,
                  backgroundColor: "#FA7C22",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#D54A1E",
                  },
                }}
              >
                Payment
              </Button>
            </ValidatorForm>
          </CustomTabPanel>
        </Box>
      </Box>
    </>
  );
}
export default ProfilePage;
