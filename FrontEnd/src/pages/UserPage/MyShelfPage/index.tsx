import Typography from "@mui/material/Typography";
import logo from "../../../assets/img/poster.jpeg";

import {
  Box,
  Button,
  ButtonBase,
  Grid,
  Paper,
  Tab,
  Tabs,
  styled,
} from "@mui/material";
import { useState } from "react";
import React from "react";
const Img = styled("img")({
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const data = [
  {
    title: "Lizard",
    author: "Steve Krug",
    img: logo,
    date: "2021-10-10",
    description: "This is a description",
  },
  {
    title: "Lizard",
    author: "Steve Krug",
    img: logo,
    date: "2021-10-10",
    description: "This is a description",
  },
  {
    title: "Lizard",
    author: "Steve Krug",
    img: logo,
    date: "2021-10-10",
    description: "This is a description",
  },
  {
    title: "Lizard",
    author: "Steve Krug",
    img: logo,
    date: "2021-10-10",
    description: "This is a description",
  },
  {
    title: "Lizard",
    author: "Steve Krug",
    img: logo,
    date: "2021-10-10",
    description: "This is a description",
  },
  {
    title: "Lizard",
    author: "Steve Krug",
    img: logo,
    date: "2021-10-10",
    description: "This is a description",
  },
  {
    title: "Lizard",
    author: "Steve Krug",
    img: logo,
    date: "2021-10-10",
    description: "This is a description",
  },
  {
    title: "Lizard",
    author: "Steve Krug",
    img: logo,
    description: "This is a description",
  },
];
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
function MyShelfPage() {
  const [showFullList, setShowFullList] = useState(true); // State to control data display
  const [showFullRecentList, setShowFullRecentList] = useState(false); // State to control data display
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleShowAll = () => {
    setShowFullList(!showFullList); // Update state to show all data
  };
  const handleRecentShowAll = () => {
    setShowFullRecentList(!showFullRecentList);
    // Update state to show all data
  };

  const filteredData = showFullList ? data : data.slice(0, 4); // Fil

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
        <Typography
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontSize: "h5.fontSize",
            marginLeft: 4,
            marginTop: 2,
          }}
          component="div"
        >
          Your <span style={{ color: "#EF8361" }}>Shelf</span>
        </Typography>
        <Box
          sx={{
            marginInline: 4,
            color: "#868686",
            paddingBottom: 4,
          }}
        >
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="disabled tabs example"
              centered
            >
              <Tab
                label="All Books"
                sx={{
                  marginInline: 2,
                  ":focus": { color: "#f4683c" },
                  ":hover": { color: "#f4683c" },
                }}
                {...a11yProps(0)}
              />
              <Tab
                label="Favourite Books"
                sx={{
                  marginInline: 2,
                  ":focus": { color: "#f4683c" },
                  ":hover": { color: "#f4683c" },
                }}
                {...a11yProps(1)}
              />
              <Tab
                label="Borrowed Books"
                sx={{
                  marginInline: 2,
                  ":focus": { color: "#f4683c" },
                  ":hover": { color: "#f4683c" },
                }}
                {...a11yProps(2)}
              />
              <Tab
                label="E-books"
                sx={{
                  marginInline: 2,
                  ":focus": { color: "#f4683c" },
                  ":hover": { color: "#f4683c" },
                }}
                {...a11yProps(3)}
              />
              <Tab
                label="Audio Books"
                sx={{
                  marginInline: 2,
                  ":focus": { color: "#f4683c" },
                  ":hover": { color: "#f4683c" },
                }}
                {...a11yProps(4)}
              />
              <Tab
                label="Articles & Journals"
                sx={{
                  marginInline: 2,
                  ":focus": { color: "#f4683c" },
                  ":hover": { color: "#f4683c" },
                }}
                {...a11yProps(5)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <Grid container spacing={3} xs={12}>
                {filteredData.map((item, index) => (
                  <Grid key={index} item xs={3}>
                    {/* Set responsive layout */}
                    <Paper
                      sx={{
                        p: 2,
                        margin: "auto",

                        width: 230,
                        height: 220,

                        backgroundColor: (theme) =>
                          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item>
                          <ButtonBase sx={{ height: 180, width: 137 }}>
                            <Img
                              src={item.img}
                              sx={{
                                objectFit: "fill",
                                marginLeft: -4,
                                marginTop: -2,
                              }}
                            />
                          </ButtonBase>
                          <Typography variant="body2" gutterBottom>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.author}
                          </Typography>
                        </Grid>
                        <Grid xs={12} sm>
                          <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ marginTop: 2 }}
                          >
                            Borrowed on
                          </Typography>
                          <Typography variant="body2">{item.date}</Typography>
                          <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ marginTop: 2 }}
                          >
                            Submission Due
                          </Typography>
                          <Typography variant="body2">{item.date}</Typography>
                          <Button
                            sx={{
                              backgroundColor: "#42bb4e",
                              "&:hover": {
                                backgroundColor: "#16771F",
                              },
                              width: 93,
                              marginTop: 1,

                              height: 32,
                              color: "white",
                            }}
                          >
                            Read
                          </Button>
                          <Button
                            sx={{
                              backgroundColor: "white",
                              border: 2,
                              marginTop: 1,
                              width: 93,
                              height: 32,
                              color: "#F76B56",
                              fontWeight: "medium",
                            }}
                          >
                            Return
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </CustomTabPanel>
        </Box>
      </Box>
    </>
  );
}

export default MyShelfPage;
