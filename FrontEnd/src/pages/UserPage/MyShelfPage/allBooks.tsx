import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Input } from "@material-tailwind/react";

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
import { ValidatorForm } from "react-material-ui-form-validator";

interface BookInterface {
  name: string;
  image: string;
  author: string;
  description: string;
  publishYear: string;
}
const styleModal = {
  position: "absolute",
  justifyContent: "center",
  textAlign: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  brentRadius: "10px",
  p: 3,
};
const AllBooks = () => {
  const [showFullList, setShowFullList] = useState(true); // State to control data display
  const [showFullRecentList, setShowFullRecentList] = useState(false); // State to control data display
  const [books, setBooks] = useState<BookInterface[]>([]);
  const [openModalRental, setOpenModalRental] = useState(false);
  const [openModalReturn, setOpenModalReturn] = useState(false);
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
  const filteredData = showFullList ? books : books.slice(0, 4); // Fil
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  return (
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
                      onClick={() => setOpenModalRental(true)}
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
                      onClick={() => setOpenModalReturn(true)}
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
      {/* Modal Rental */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModalRental}
        onClose={() => setOpenModalRental(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalRental}>
          <Box sx={styleModal}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Fill Up the details
            </Typography>
            <ValidatorForm onSubmit={() => {}}>
              <Typography>From: {formattedDate}</Typography>
              <Typography>Book</Typography>
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
                defaultValue={"Harry Potter"}
                onChange={undefined}
                crossOrigin={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              <Typography>FullName</Typography>
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
                defaultValue={"Sang"}
                onChange={undefined}
                crossOrigin={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              <Typography>Price</Typography>
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
                defaultValue={"12$"}
                onChange={undefined}
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
                Rental
              </Button>
            </ValidatorForm>
          </Box>
        </Fade>
      </Modal>
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Fill Up the details
            </Typography>
            <ValidatorForm onSubmit={() => {}}>
              <Typography>From: {formattedDate}</Typography>
              <Typography>To: {formattedDate}</Typography>
              <Typography>Book</Typography>
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
                defaultValue={"Harry Potter"}
                onChange={undefined}
                crossOrigin={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              <Typography>FullName</Typography>
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
                defaultValue={"Sang"}
                onChange={undefined}
                crossOrigin={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              <Typography>Price</Typography>
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
                defaultValue={"12$"}
                onChange={undefined}
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

export default AllBooks;