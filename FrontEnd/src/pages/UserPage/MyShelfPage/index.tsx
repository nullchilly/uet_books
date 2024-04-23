import Typography from "@mui/material/Typography";
import logo from "../../../assets/img/poster.jpeg";

import { Box, Button, ButtonBase, Grid, Paper, styled } from "@mui/material";
import { useState } from "react";
const Img = styled("img")({
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
function MyShelfPage() {
  const [showFullList, setShowFullList] = useState(true); // State to control data display
  const [showFullRecentList, setShowFullRecentList] = useState(false); // State to control data display

  const handleShowAll = () => {
    setShowFullList(!showFullList); // Update state to show all data
  };
  const handleRecentShowAll = () => {
    setShowFullRecentList(!showFullRecentList);
    // Update state to show all data
  };
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
            display: "flex",

            justifyContent: "space-between",
            marginInline: 4,
            color: "#868686",
            paddingBottom: 4,
          }}
        >
          <Typography gutterBottom component="div" sx={{ color: "black" }}>
            All Books
          </Typography>
          <Typography gutterBottom component="div">
            Favourite Books
          </Typography>
          <Typography gutterBottom component="div">
            Borrowed Books
          </Typography>
          <Typography gutterBottom component="div">
            E-books
          </Typography>
          <Typography gutterBottom component="div">
            Audio Books
          </Typography>
          <Typography gutterBottom component="div">
            Articles & Journals
          </Typography>
          {/*   <Button onClick={handleShowAll} sx={{ color: "black" }}>
            {showFullList ? "Show less" : "Show all"}
          </Button> */}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            marginInline: 4,
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
                    flexGrow: 1,
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
      </Box>
    </>
  );
}

export default MyShelfPage;
