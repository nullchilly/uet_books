import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import { Box, Button, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface BookInterface {
  Title: string;
  Coverurl: string;
  Author: string;
  Year: string;
  ID: string;
}

interface favouriteInfo {
  mongoId: string;
}
const FavouriteBooks = () => {
  const navigate = useNavigate();

  const [showFullList, setShowFullList] = useState(true); // State to control data display

  const [favouriteBooks, setFavouriteBooks] = useState<BookInterface[]>([]);
  const [favourite, setFavourite] = useState<favouriteInfo[]>([]);
  let id = localStorage.getItem("id") || "";

  const getListFavourite = async (userId: string) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/user/getFavouriteBooks/${userId}`
      );
      console.log(res.data, "favourite");

      return res.data.rentalInfo;
    } catch (err: any) {
      console.log("fe : " + err.message);
    }
  };

  const fetchData = async () => {
    try {
      const allBookList = await getListFavourite(id);
      setFavourite(allBookList);

      console.log(allBookList, "HIHI");
    } catch (error) {
      // Xử lý lỗi nếu có
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const getBookList = async () => {
    try {
      let favouriteBooksData = [];
      console.log("RENTING");
      for (let i = 0; i < favourite.length; i++) {
        const res = await axios.get(`http://localhost:3000/books/search`, {
          params: {
            id: favourite[i].mongoId,
          },
        });
        console.log(favourite[i].mongoId, "ID");

        console.log(res.data, "LOG");
        favouriteBooksData.push(res.data);
        // Thêm dữ liệu vào mảng mới
      }
      // Set state với mảng mới đã chứa dữ liệu
      setFavouriteBooks(favouriteBooksData);
    } catch (err) {
      console.log("fail");
    }
  };

  useEffect(() => {
    getBookList();
  }, [favourite]);

  const handleUnlike = async (ID: string) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/user/rental/returnBook",
        {
          userId: localStorage.getItem("id"),
          bookId: ID,
        }
      );
      console.log(res.data);
      alert("Book returned successfully");
      window.location.reload();

      return res.data;
    } catch (err: any) {
      alert("Book already returned");
      console.log("fe : " + err.message);
    }
  };
  function handleClick(book_id: any) {
    navigate(`/user/${book_id}`);
  }
  const filteredData = showFullList
    ? favouriteBooks
    : favouriteBooks?.slice(0, 4); // Fil
  //const currentDate = new Date();
  // const formattedDate = currentDate.toLocaleDateString();
  const MAX_TITLE_LENGTH = 30;
  const shortenTitle = (title: string) => {
    if (title.length > MAX_TITLE_LENGTH) {
      return title?.slice(0, MAX_TITLE_LENGTH) + "...";
    }
    return title;
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {
        <Grid container spacing={2} xs={12}>
          {filteredData?.map((item, index) => (
            <Grid key={index} item xs={3}>
              {/* Set responsive layout */}
              <Card sx={{ display: "flex", height: 250 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 130, height: 164, objectFit: "fill" }}
                    src={
                      "https://raw.githubusercontent.com/nullchilly/libgen_covers/covers/" +
                      item.Coverurl
                    }
                    alt="Live from space album cover"
                  />
                  <CardContent sx={{ maxHeight: 24 }}>
                    <Typography gutterBottom sx={{ fontSize: 14 }}>
                      {shortenTitle(item.Title)}
                    </Typography>
                  </CardContent>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: 12 }}
                      color="text.secondary"
                    >
                      {item.Author}
                    </Typography>
                    <Typography component="div" variant="subtitle2">
                      Borrowed on
                    </Typography>
                    <Typography variant="caption">{item.Year}</Typography>
                    {/* <Typography variant="subtitle2" component="div">
                      Submission Due
                    </Typography>
                    <Typography variant="caption">{item.Year}</Typography> */}
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
                      onClick={() => handleClick(item.ID)}
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
                      onClick={() => {
                        handleUnlike(item.ID);
                      }}
                    >
                      UnLike
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      }
    </Box>
  );
};

export default FavouriteBooks;
