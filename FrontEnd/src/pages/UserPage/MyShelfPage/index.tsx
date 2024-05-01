import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import BorrowingBooks from "./BorrowingBooks";

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
function MyShelfPage() {
  const [value, setValue] = React.useState(0);

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
                label="Borrowing Books"
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
            <p>allbooks</p>
            {/*   <AllBooks /> */}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <p>favouriteBooks</p>
            {/*    <AllBooks /> */}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <BorrowingBooks />
          </CustomTabPanel>
        </Box>
      </Box>
    </>
  );
}

export default MyShelfPage;
