import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Input } from "@material-tailwind/react";

import { Box, Button, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ValidatorForm } from "react-material-ui-form-validator";
import { useNavigate } from "react-router-dom";

interface BookInterface {
  Title: string;
  Coverurl: string;
  Author: string;
  Year: string;
  ID: string;
}

const styleModal = {
  position: "absolute",
  justifyContent: "center",
  radius: 20,

  //textAlign: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  brentRadius: "10px",
  p: 3,
};
/* const data = [
  { mongoId: 10 },
  { mongoId: 11 },
  { mongoId: 12 },
  { mongoId: 13 },
  { mongoId: 14 },
]; */
interface rentalInfo {
  mongoId: string;
  rentalDate: string;
}
const BorrowingBooks = () => {
  const navigate = useNavigate();

  const [showFullList, setShowFullList] = useState(true); // State to control data display
  const [books, setBooks] = useState<BookInterface[]>([]);
  const [title, setTitle] = useState(""); // State to control data display
  const [borrowingBooks, setBorrowingBooks] = useState<BookInterface[]>([]);
  const [ID, setID] = useState(""); // State to control data display
  const [price, setPrice] = useState("30"); // State to control data display
  const [openModalReturn, setOpenModalReturn] = useState(false);
  const [renting, setRenting] = useState<rentalInfo[]>([]);

  let fullName = localStorage.getItem("fullName") || "";
  let id = localStorage.getItem("id") || "";

  /* const getBook = async () => {
    console.log(data);
    try {
      let borrowingBooksData = [];
      for (let i = 0; i < data.length; i++) {
        const res = await axios.get(`http://localhost:3000/books/search`, {
          params: {
            id: data[i].mongoId,
          },
        });
        console.log(res.data);
        borrowingBooksData.push(res.data);
        // Thêm dữ liệu vào mảng mới
      }
      // Set state với mảng mới đã chứa dữ liệu
      setBorrowingBooks(borrowingBooksData);
    } catch (err) {
      console.log("fail");
    }
  }; */
  /*  useEffect(() => {
    fetchData();
    getBook();
    console.log(borrowingBooks);
  }, []); */
  const getListBorrow = async (userId: string) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/user/rental/rentingBook/${userId}`
      );
      console.log(res.data, "renting");

      return res.data.rentalInfo;
    } catch (err: any) {
      console.log("fe : " + err.message);
    }
  };

  const fetchData = async () => {
    try {
      const allBookList = await getListBorrow(id);
      setRenting(allBookList);
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
      let borrowingBooksData = [];
      console.log("RENTING");
      for (let i = 0; i < renting.length; i++) {
        const res = await axios.get(`http://localhost:3000/books/search`, {
          params: {
            id: renting[i].mongoId,
          },
        });
        console.log(renting[i].mongoId, "ID");

        console.log(res.data, "LOG");
        borrowingBooksData.push(res.data);
        // Thêm dữ liệu vào mảng mới
      }
      // Set state với mảng mới đã chứa dữ liệu
      setBorrowingBooks(borrowingBooksData);
    } catch (err) {
      console.log("fail");
    }
  };

  useEffect(() => {
    getBookList();
  }, [renting]);

  const handleReturn = async () => {
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
      //window.location.reload();
      console.log("fe : " + err.message);
    }
  };
  function handleClick(book_id: any) {
    navigate(`/user/view/${book_id}`);
  }
  const filteredData = showFullList
    ? borrowingBooks
    : borrowingBooks?.slice(0, 4); // Fil
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
                        setOpenModalReturn(true), setTitle(item.Title);
                        setID(item.ID);
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

      {/* Modal Return */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModalReturn}
        onClose={() => setOpenModalReturn(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalReturn}>
          <Box sx={styleModal}>
            <Typography
              id="transition-modal-title"
              sx={{ textAlign: "center" }}
              variant="h6"
              component="h2"
            >
              Fill Up the details
            </Typography>
            <ValidatorForm onSubmit={handleReturn}>
              {/*  <Typography>From: {formattedDate}</Typography> */}
              <Typography
                sx={{ marginLeft: 2, marginBottom: 1, marginTop: 1 }}
                variant="subtitle2"
              >
                Book
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
                defaultValue={title}
                disabled
                crossOrigin={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              <Typography
                sx={{ marginLeft: 2, marginBottom: 1, marginTop: 1 }}
                variant="subtitle2"
              >
                BookID
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
                defaultValue={ID}
                disabled
                crossOrigin={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              <Typography
                sx={{ marginLeft: 2, marginBottom: 1, marginTop: 1 }}
                variant="subtitle2"
              >
                FullName
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
                defaultValue={fullName}
                disabled
                crossOrigin={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              <Typography
                sx={{ marginLeft: 2, marginBottom: 1, marginTop: 1 }}
                variant="subtitle2"
              >
                Price
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
                defaultValue={price}
                disabled
                crossOrigin={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />

              <Button
                sx={{
                  marginTop: "10px",
                  backgroundColor: "#F27851",
                  width: "90%",
                  marginLeft: 2,
                }}
                variant="contained"
                type="submit"
              >
                Return
              </Button>
            </ValidatorForm>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default BorrowingBooks;
