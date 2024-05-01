import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import newarrivals from "../../../assets/img/newarrivals.jpeg";

import { Box, Button, CardActionArea, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export interface BookInterface {
  Title: string;
  Coverurl: string;
  Author: string;
}

function HomePage() {
  const [showFullList, setShowFullList] = useState(false); // State to control data display
  const [showFullRecentList, setShowFullRecentList] = useState(false); // State to control data display
  const [books, setBooks] = useState<BookInterface[]>([]);
  const handleShowAll = () => {
    setShowFullList(!showFullList); // Update state to show all data
  };
  const handleRecentShowAll = () => {
    setShowFullRecentList(!showFullRecentList);
    // Update state to show all data
  };
  const getAllBooks = async () => {
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
        const allBookList = await getAllBooks();
        setBooks(allBookList);
        console.log("abc");
      } catch (error) {
        // Xử lý lỗi nếu có
      }
    };
    console.log("fetching data");

    fetchData();
  }, []);
  const MAX_TITLE_LENGTH = 30;
  const shortenTitle = (title: string) => {
    if (title.length > MAX_TITLE_LENGTH) {
      return title.slice(0, MAX_TITLE_LENGTH) + "...";
    }
    return title;
  };
  const filteredData = showFullList ? books : books.slice(0, 6); // Fil
  function handleClick() {
    console.log("Button clicked!");
    alert("Button clicked!");
  }
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
        <Box
          sx={{
            display: "flex",
            marginInline: 4,
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Card
            sx={{ alignContent: "center" }}
            style={{
              background: `linear-gradient(to bottom right, #EB5231, #571FCF)`,
            }}
          >
            <CardActionArea>
              <CardContent sx={{ color: "white" }}>
                <Typography gutterBottom variant="h5" component="div">
                  Today's Quote
                </Typography>
                <Typography variant="body2">
                  “All the adversity I've had in my life, all my troubles and
                  obstacles, have strengthened me... You may not realize it when
                  it happens, but a kick in the teeth may be the best thing in
                  the world for you.”
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", flexDirection: "row-reverse" }}
                >
                  – Walt Disney
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <CardMedia
            component="img"
            height="200"
            sx={{ objectFit: "contain" }}
            src={newarrivals}
          />
        </Box>

        <Typography
          gutterBottom
          sx={{
            fontWeight: "medium",
            fontSize: "h4.fontSize",
            marginLeft: 4,
            marginTop: 2,
          }}
          component="div"
        >
          Good Morning
        </Typography>
        <Box
          sx={{
            display: "flex",

            justifyContent: "space-between",
            marginInline: 4,
            color: "#4d4d4d",
          }}
        >
          <Typography gutterBottom variant="h6" component="div">
            Recommended for You
          </Typography>
          <Button onClick={handleShowAll} sx={{ color: "black" }}>
            {showFullList ? "Show less" : "Show all"}
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            marginInline: 4,
          }}
        >
          <Grid container spacing={3} xs={24}>
            {filteredData.map((item, index) => (
              <Grid key={index} item xs={2}>
                {/* Set responsive layout */}
                <Card sx={{ width: 168, height: 260 }}>
                  <CardActionArea onClick={handleClick}>
                    <CardMedia
                      component="img"
                      alt={item.Title}
                      height="200"
                      sx={{ objectFit: "fill" }}
                      width="123"
                      src={
                        "https://raw.githubusercontent.com/nullchilly/libgen_covers/covers/" +
                        item.Coverurl
                      }
                    />
                    <CardContent>
                      {
                        <Typography gutterBottom variant="body2">
                          {shortenTitle(item.Title)}
                        </Typography>
                      }
                      {/* <Typography variant="body2" color="text.secondary">
                        {item.author}
                      </Typography> */}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            marginTop: 3,
            justifyContent: "space-between",
            marginInline: 4,
            color: "#4d4d4d",
          }}
        >
          <Typography gutterBottom variant="h6" component="div">
            Recent Readings
          </Typography>
          <Button onClick={handleRecentShowAll} sx={{ color: "black" }}>
            {showFullRecentList ? "Show less" : "Show all"}
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            marginInline: 4,
          }}
        >
          <Grid container spacing={3} xs={24}>
            {filteredData.map((item, index) => (
              <Grid key={index} xs={2} item>
                {/* Set responsive layout */}
                <Card sx={{ width: 168, height: 260 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={item.Title}
                      height="190"
                      sx={{ objectFit: "fill" }}
                      width="123"
                      src={
                        "https://raw.githubusercontent.com/nullchilly/libgen_covers/covers/" +
                        item.Coverurl
                      }
                    />
                    <CardContent>
                      <Typography gutterBottom variant="body2">
                        {shortenTitle(item.Title)}
                      </Typography>
                      {/*  <Typography variant="body2" color="text.secondary">
                      {item.author}
                    </Typography> */}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
