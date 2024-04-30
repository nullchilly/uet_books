import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import {
  Box,
  Button,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface BookInterface {
  name: string;
  image: string;
  author: string;
  description: string;
  publishYear: string;
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
function MyShelfPage() {
  const [showFullList, setShowFullList] = useState(true); // State to control data display
  const [showFullRecentList, setShowFullRecentList] = useState(false); // State to control data display
  const [value, setValue] = React.useState(0);
  const [books, setBooks] = useState<BookInterface[]>([]);
  const getBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/books/all");
      console.log(res.data);
      return res.data;
    } catch (err: any) {
      console.log("fe : " + err.message);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allBookList = await getBooks();
        setBooks(allBookList);
        console.log("abc");
      } catch (error) {
        // Xử lý lỗi nếu có
      }
    };
    console.log("fetching data");

    fetchData();
  }, []);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
/*   const handleShowAll = () => {
    setShowFullList(!showFullList); // Update state to show all data
  };
  const handleRecentShowAll = () => {
    setShowFullRecentList(!showFullRecentList);¯
    // Update state to show all data
  }; */

  const filteredData = showFullList ? books : books.slice(0, 4); // Fil

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
              {
                <Grid container spacing={2} xs={12}>
                  {filteredData.map((item, index) => (
                    <Grid key={index} item xs={3}>
                      {/* Set responsive layout */}
                      <Card sx={{ display: "flex", height: 250 }}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <CardMedia
                            component="img"
                            sx={{ width: 130, height: 164, objectFit: "fill" }}
                            image={item.image}
                            alt="Live from space album cover"
                          />
                          <CardContent sx={{ maxHeight: 24 }}>
                            <Typography gutterBottom sx={{ fontSize: 14 }}>
                              {item.name}
                            </Typography>
                            {/* <Typography
                              variant="body2"
                              sx={{ fontSize: 12 }}
                              color="text.secondary"
                            >
                              {item.author}
                            </Typography> */}
                          </CardContent>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardContent sx={{ flex: "1 0 auto" }}>
                            <Typography component="div" variant="subtitle2">
                              Borrowed on
                            </Typography>
                            <Typography variant="caption">
                              {item.publishYear}
                            </Typography>
                            <Typography variant="subtitle2" component="div">
                              Submission Due
                            </Typography>
                            <Typography variant="caption">
                              {item.publishYear}
                            </Typography>
                          </CardContent>
                          <Box
                            sx={{
                              alignItems: "center",
                              pl: 1,
                              pb: 1,
                            }}
                          >
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
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              }
            </Box>
          </CustomTabPanel>
        </Box>
      </Box>
    </>
  );
}

export default MyShelfPage;
