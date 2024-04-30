import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const dumpData = {
  id: "abc123",
  book_img_url: `https://minh.la/wp-content/uploads/2020/03/Dont-make-me-think.jpg`,
  name: `Don't Make Me Think`,
  author: `Steve Krug`,
  publish_year: 2000,
  rating: 4.5,
  category: [12, 49],
  status: "In-Shelf",
};

function BookDetail() {
  const { book_id } = useParams();
  const navigate = useNavigate();
  const [bookDetail, setBookDetail] = React.useState(dumpData);

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Box id="style-2" className="container">
      <Box sx={{ flexGrow: 1, margin: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "4px",
                alignItems: "center",
              }}
            >
              <IconButton
                sx={{ padding: "0px" }}
                onClick={() => handleGoBack()}
              >
                <ArrowBackIcon sx={{ color: "#4D4D4D" }} />
              </IconButton>
              <Typography>Go Back</Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Typography>col1</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>col2</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>col3</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default BookDetail;
