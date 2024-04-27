import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Input } from "@material-tailwind/react";
import book from "../../../assets/img/book.svg";
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
  const [name, setName] = React.useState("Tram");
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
                label="Logins & Security"
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
                  <Input
                    type="search"
                    style={{
                      color: "black",
                      backgroundColor: "#F0F3F7",

                      border: 1,
                      borderColor: "#E0E4EC",
                      padding: 8,

                      fontSize: 16,
                      width: "90%",
                      height: 42,
                      marginLeft: 16,
                    }}
                    defaultValue={name}
                    onChange={undefined}
                    crossOrigin={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
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
                  <Input
                    type="search"
                    style={{
                      color: "black",

                      backgroundColor: "#F0F3F7",
                      border: 1,
                      borderColor: "#E0E4EC",
                      padding: 8,

                      minWidth: "90%",
                      height: 42,
                      marginLeft: 16,
                    }}
                    defaultValue="Small"
                    onChange={undefined}
                    crossOrigin={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
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
                  <Input
                    type="search"
                    style={{
                      color: "black",
                      margin: 2,
                      backgroundColor: "#F0F3F7",
                      border: 1,
                      borderColor: "#E0E4EC",
                      padding: 8,
                      width: "90%",
                      height: 42,
                      marginLeft: 16,
                    }}
                    defaultValue="Small"
                    onChange={undefined}
                    crossOrigin={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </Grid>
                <Grid xs={8} sx={{ justifyContent: "center" }}>
                  <Typography
                    component="h1"
                    sx={{ fontSize: 16 }}
                    mt={3}
                    ml={2}
                  >
                    Phone Number
                  </Typography>
                  <Input
                    type="search"
                    style={{
                      color: "black",
                      backgroundColor: "#F0F3F7",
                      border: 1,
                      borderColor: "#E0E4EC",
                      padding: 8,
                      fontSize: 16,
                      width: "90%",
                      height: 42,
                      marginLeft: 16,
                    }}
                    defaultValue="Small"
                    onChange={undefined}
                    crossOrigin={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </Grid>
                <Grid xs={16} sx={{ justifyContent: "center" }}>
                  <Typography
                    component="h1"
                    sx={{ fontSize: 16 }}
                    mt={2}
                    ml={2}
                  >
                    Bio
                  </Typography>
                  <TextField
                    id="filled-multiline-static"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{
                      margin: 2,
                      marginTop: 1,
                      width: "95%",
                      backgroundColor: "#F0F3F7",
                    }}
                    defaultValue="I'm a student"
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
        </Box>
      </Box>
    </>
  );
}
export default ProfilePage;
